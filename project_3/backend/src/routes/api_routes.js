const express = require('express');
const routerAPI = express.Router();
const { rootApi, createUser, loginUser, getUsers, getAccount } = require('../controllers/api_controller');
const auth = require('../middleware/auth');

routerAPI.use(auth); // Middleware to check access token for all routes

routerAPI.get("/", rootApi);
routerAPI.post("/user/register", createUser);
routerAPI.post("/user/login", loginUser);
routerAPI.get("/user/get-users", getUsers);
routerAPI.get("/account", getAccount);

module.exports = routerAPI;