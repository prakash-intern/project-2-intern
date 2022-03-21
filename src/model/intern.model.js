const mongoose = require('mongoose'); 
const IsEmail = require('isemail');

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
            }
        }
    },
    mobile:{
        type: Number,
        required: [true, 'The mobile field is required'],
        min: 10,
        unique: true,
        trim: true
    },
    collegeId: {
        type: mongoose.Types.ObjectId,
        ref: 'College'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
}); 

module.exports = mongoose.model('Intern', internSchema); //interns 
