
const express = require('express');
const router = express.Router();
const {createJob,updateJob, deleteJob} = require('../controller/jobController');
 //getAllJobs, getJobById, updateJob, deleteJob 
// Route to create a new job
router.post('/createJob', createJob);
router.post('/updateJob/:id',updateJob)
router.delete('/deleteJob',deleteJob)
module.exports = router;

