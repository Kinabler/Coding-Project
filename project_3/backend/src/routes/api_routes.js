const express = require('express');
const routerAPI = express.Router();
const { rootApi, createUser, loginUser, getUsers } = require('../controllers/api_controller');
const { getRounds } = require('bcrypt');

routerAPI.get("/", rootApi);
routerAPI.post("/user/register", createUser);
routerAPI.post("/user/login", loginUser);
routerAPI.get("/user/get-users", getUsers);

module.exports = routerAPI;