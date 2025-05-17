const express = require("express");
const routerAPI = express.Router();
const { loadFavicon, getRootPage, addUserAPI, showUsersAPI } = require("../controllers/user_controller");

routerAPI.get("/favicon.ico", loadFavicon);
routerAPI.get("/", getRootPage);
routerAPI.post("/users/add", addUserAPI);
routerAPI.get("/users/list", showUsersAPI);

module.exports = routerAPI;