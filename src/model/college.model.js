const mongoose = require('mongoose'); 

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name field is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: [true, 'The fullName field is required'],
        trim: true
    },
    logoLink: {
        type: String,
        required: [true, 'The logo link is required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
}); 

module.exports = mongoose.model('College', collegeSchema); //colleges 
