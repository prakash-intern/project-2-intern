const collegeSchema = require('../model/college.model');
const clientError = require('../helpers/clientError'); 
const internSchema = require('../model/intern.model'); 

const createCollege = async (req, res) => {
    try {
        const data = req.body;
        if(data.logoLink){
            if(data.logoLink.indexOf("https://functionup.s3.ap-south-1.amazonaws.com/colleges") == -1){
                return res.status(400).send({
                    status: false,
                    message: 'Only AWS S3 bucket url are allowed !'
                });
            }
        }
        const dataRes = await collegeSchema.create(data);
        return res.status(201).send({
            status: true,
            message: 'Data instered successfully !',
            data: dataRes
        });
    } catch (error) {
        clientError.handleError(res, error); 
    }
}

const fetchDetails = async(req, res)=>{
    try {
        const collegeName = req.query.collegeName
        if(!collegeName){
            return res.status(400).send({
                status: false,
                message: 'CollegeName must be present !'
            });
        }
        const fetchData = await collegeSchema.findOne({
            name: collegeName,
            isDeleted: false
        }).select({
            isDeleted: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        });
        if(!fetchData){ 
            return res.status(404).send({
                status: false,
                message: 'College not found'
            });
        }
        const interests = await internSchema.find({
            collegeId: fetchData._id,
            isDeleted: false
        }).select({
            isDeleted: 0,
            createdAt: 0,
            updatedAt: 0,
            collegeId: 0,
            __v: 0
        }); 
        const allData = fetchData.toObject();  //convert mongoose object to normal object /* https://mongoosejs.com/docs/api.html#document_Document-toObject*/
        allData.internCount = interests.length
        allData.interests = interests;

        return res.status(200).send({
            status: true,
            data: allData
        }); 
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        }); 
    }
}

module.exports = {
    createCollege,
    fetchDetails
}