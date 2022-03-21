const collegeSchema = require('../model/college.model');
const clientError = require('../helpers/clientError'); 
const internSchema = require('../model/intern.model'); 

const createCollege = async (req, res) => {
    try {
        const data = req.body;
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
                message: 'collegeName must be present !'
            });
        }
        const fetchData = await collegeSchema.findOne({
            name: collegeName
        });
        const interests = await internSchema.find({
            collegeId: fetchData._id
        }); 
        fetchData["interests"] = interests; 
        return res.status(200).send({
            status: true,
            data: fetchData
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