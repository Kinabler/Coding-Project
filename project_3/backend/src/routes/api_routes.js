const express = require('express');
const routerAPI = express.Router();
const { rootApi, createUser } = require('../controllers/api_controller');

routerAPI.get("/", rootApi);
routerAPI.post("/user/register", createUser);

module.exports = routerAPI;