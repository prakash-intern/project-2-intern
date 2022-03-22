const express = require('express'); 
const router = express.Router(); 
const collegeController = require('../controller/college.controller'); 
const internController = require('../controller/intern.controller');

router.post('/colleges', collegeController.createCollege); 
router.post('/interns', internController.createInterns); 
router.get('/collegeDetails', collegeController.fetchDetails); 


module.exports = router; 



