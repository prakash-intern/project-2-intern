const collegeSchema = require('../model/college.model'); 

const createCollege = async (req, res)=>{
    try{
        const data = req.body; 
        const dataRes = await collegeSchema.create(data); 
        return res.status(201).send({
            status: true,
            message: 'Data instered successfully !',
            data: dataRes
        }); 
    }catch(error){
        const key = Object.keys(error['errors']); 
        key.forEach((key)=>{
            if(error['errors'][key]['kind'] === "required"){
                res.status(400).send({
                    status: false,
                    message: error.message
                }); 
            }
        }); 
        return res.status(500).send({
            status: false,
            message: error.message
        }); 
    }
}

module.exports = {
    createCollege
}