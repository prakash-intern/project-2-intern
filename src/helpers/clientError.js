const mongoose = require('mongoose');

const handleError = (res, error)=>{
    if(error['errors'] != null){  
        const key = Object.keys(error['errors']);
        const errorField = []; 
        key.forEach((key)=>{
            let errorType = error['errors'][key]; 
            errorField.push({
                type: errorType['kind'],
                message: errorType['message']
            }); 
        }); 
        if (errorField.length > 0) {
            return res.status(400).send({
                status: false,
                message: errorField
            });
        }
    }
    return res.status(500).send({
        status: false,
        message: error.message
    });
}

const handleObjectId = (id)=>{
    return mongoose.Types.ObjectId.isValid(id); 
}

module.exports = {
    handleError,
    handleObjectId
}