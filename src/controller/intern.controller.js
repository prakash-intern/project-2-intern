const internSchema = require('../model/intern.model'); 
const clientError = require('../helpers/clientError'); 

const createInterns = async(req, res)=>{
    try{
        const data = req.body; 
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