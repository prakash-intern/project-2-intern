const handleError = (res, error)=>{
    // res.send(error)
    // return false; 
    if(error['errors'] != null){
        const key = Object.keys(error['errors']);
        const requiredField = [], uniqueField = [];
        key.forEach((key) => {
            if (error['errors'][key]['kind'] === "required") {
                requiredField.push(error['errors'][key]['message']);
            }
        });
        if (requiredField.length > 0) {
            return res.status(400).send({
                status: false,
                message: requiredField
            });
        }
        // for unique data
        key.forEach((key) => {
            if (error['errors'][key]['kind'] === "unique") {
                uniqueField.push(error['errors'][key]['message']);
            }
        });
        if(uniqueField.length > 0)
        return res.status(409).send({
            status: false,
            message: uniqueField
        }); 

        // for email format
        if (error['errors']['email']['kind'] === "user defined") {
            return res.status(400).send({
                status: false,
                message: error['errors']['email'].message
            });
        }
    }
    return res.status(500).send({
        status: false,
        message: error.message
    });
}

module.exports = {
    handleError
}