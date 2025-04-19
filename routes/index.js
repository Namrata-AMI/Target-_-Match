const express = require('express');
const router = express.Router();
const { login, getCompanies, updateCompanyStatus } = require('../controllers/index.js');
const { authenticateToken } = require('../middlewares/auth.js');


router.post('/login', login);


router.get('/accounts', authenticateToken, getCompanies);


router.post('/accounts/:id/status', authenticateToken, updateCompanyStatus);



module.exports = router;
