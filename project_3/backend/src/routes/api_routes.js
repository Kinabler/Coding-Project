const express = require('express');
const routerAPI = express.Router();
const { rootApi } = require('../controllers/api_controller');

routerAPI.get("/", rootApi);

module.exports = routerAPI;