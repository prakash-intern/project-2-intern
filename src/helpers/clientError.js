const mongoose = require('mongoose');

const handleError = (res, error)=>{
    if(error['errors'] != null){  
        const key = Object.keys(error['errors']);
        const requiredField = [], uniqueField = [];
        key.forEach((key) => {
            if (error['errors'][key]['kind'] === "required") {
                requiredField.push(error['errors'][key]['message']);
            }
            else if(error['errors'][key]['kind'] === "user defined"){
                requiredField.push(error['errors'][key]['message']);
            }
            else if(error['errors'][key]['kind'] === "regexp"){
                requiredField.push(error['errors'][key]['message'] = "Mobile number should be 10 digits and only Indains numbers are allowed");
            }
            else if (error['errors'][key]['kind'] === "unique") {
                uniqueField.push(error['errors'][key]['message']);
            }
        });
        if (requiredField.length > 0) {
            return res.status(400).send({
                status: false,
                message: requiredField
            });
        }
        if(uniqueField.length > 0)
        return res.status(400).send({  //409
            status: false,
            message: uniqueField
        }); 
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