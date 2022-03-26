const internSchema = require('../model/intern.model'); 
const collegeSchema = require('../model/college.model'); 
const clientError = require('../helpers/clientError'); 

const createInterns = async(req, res)=>{
    try{
        const data = req.body;
        if(!data.collegeName){
            return res.status(400).send({
                status: false,
                message: 'collegeName field is required'
            });
        }
        const collegeRes = await collegeSchema.findOne({name: data.collegeName}); 
        if(!collegeRes){
            return res.status(404).send({
                status: false,
                message: 'College not found !'
            });
        }
        data.collegeId = collegeRes._id; 
        const dataRes = await internSchema.create(data); 
        return res.status(201).send({
            status: true,
            message: 'Data instered successfully !',
            data: dataRes
        });
    }catch(error){
        clientError.handleError(res, error); 
    }
}

module.exports = {
    createInterns
}