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
    try{
       const collegeName=req.query.collegeName;
       if(!collegeName){
        return res.status(400).send({
            status:false,
            msg:'collegename must be  present'
        })
       }
       const data=await collegeSchema.findOne({
           name:collegeName
       }).select({
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    });
       const collegeId= data._id;
       const interest= await internSchema.find({
           collegeId:collegeId
       }).select({
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
        collegeId: 0,
        __v: 0
    });
       const  wholeData=data.toObject();
       wholeData.interestCount=interest.length;
       wholeData.interest=interest;


       return  res.status(200).send({
                status: true,
                data: wholeData
            });

    }
    catch(err){
        return res.status(500).send({
            status:false,
            msg:err.message
        })
        
    }



}

module.exports = {
    createCollege,
    fetchDetails
}