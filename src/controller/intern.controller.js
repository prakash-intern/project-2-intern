const internSchema = require('../model/intern.model'); 
const collegeSchema = require('../model/college.model'); 
const clientError = require('../helpers/clientError'); 

const createInterns = async(req, res)=>{
    try{
        const data = req.body;
        const collegeName = data.collegeName; 
        if(!collegeName){
            return res.status(400).send({
                status: false,
                message: 'collegeName must be required'
            });
        }
        const collegeIdRes = await collegeSchema.findOne({
            name: collegeName
        });  
        delete data.collegeName;  //delete key or property from the object data with the help of delete operator
        data.collegeId = collegeIdRes._id; 
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