const express = require('express');
const routerAPI = express.Router();
const { rootApi, createUser, loginUser } = require('../controllers/api_controller');

routerAPI.get("/", rootApi);
routerAPI.post("/user/register", createUser);
routerAPI.post("/user/login", loginUser);

module.exports = routerAPI;