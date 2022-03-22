const internSchema = require('../model/intern.model'); 
const collegeSchema = require('../model/college.model'); 
const clientError = require('../helpers/clientError'); 

const createInterns = async(req, res)=>{
    try{
        const data = req.body;
        if(data.collegeId){
            if(!clientError.handleObjectId(data.collegeId)){
                return res.status(400).send({
                    status: false,
                    message: 'collegeId must be a Object Id'
                });
            }
        }
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