
const express = require('express');
const router = express.Router();
const { registerCompany, getCompany,getCompanyById,updateCompany}= require('../controller/companyController');


router.post('/register', registerCompany);
router.get('/getCompany', getCompany);
router.get('/getCompanyById/:id', getCompanyById);
router.post('/updateCompany/:id', updateCompany);

module.exports = router;