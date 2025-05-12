const express = require('express');
const router = express.Router();
const { homePage } = require('../controllers/web_controller');

router.get('/', homePage);

module.exports = router;