const express = require('express'); 
const router = express.Router(); 
const collegeController = require('../controller/college.controller'); 

router.post('/colleges', collegeController.createCollege); 





module.exports = router; 



