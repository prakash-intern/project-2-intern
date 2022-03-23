const mongoose = require('mongoose'); 
const IsEmail = require('isemail');
const uniqueValidator = require('mongoose-unique-validator'); 

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name field is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'The email field is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (data)=>{
                return IsEmail.validate(data)
            },
            message: 'Enter a valid Email Id'
        }
    },
    mobile:{
        type: String,
        required: [true, 'The mobile field is required'],
        unique: true,
        trim: true,
        match: /^[6789]\d{9}$/

        /*  /^[0-9]{10}$/ */ /* \d for 0-9 */
    },
    collegeId: {
        type: mongoose.Types.ObjectId,
        ref: 'College',
        required: [true, 'The collegeId field is required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
}); 

uniqueValidator.defaults.message = "The {PATH} is already registerd";
internSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Intern', internSchema); //interns 
