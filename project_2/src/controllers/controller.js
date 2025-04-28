const pool = require('../configs/database');
const { queryCheckConnection, queryGetAllUser, queryCreateUser, queryCheckUserExists } = require('../services/CRUDService');

// Home Page logical
const getHomePage = async (req, res) => {
    // Check connection to database
    console.log(await queryCheckConnection ? ">> Connection to Database: OK" : ">> Connection to Database: Failed");
    // Get all users from database
    let userData = await queryGetAllUser();
    if (userData.length > 0) {
        console.log(">>> Get User from Database: OK");
    } else {
        console.log(">>> Get User from Database: Failed");
    }
    res.render("homePage", { users: userData });
}

// Create User Page logical
const getCreateUser = async (req, res) => {
    res.render("createUserPage");
}

// Create User logical
const postCreateUser = async (req, res) => {
    let { email, username, password } = req.body;
    // Check if user already exists
    let existed = await queryCheckUserExists(email, username);
    if (existed) {
        console.log(">>> User already exists");
        return res.render("createUserPage", { message: "User already exists" });
    }
    // Create user
    let result = await queryCreateUser(email, username, password);
    if (result) {
        console.log(">>> Create User: OK");
        return res.render("createUserPage", { message: "Create User Successfully" });
    } else {
        console.log(">>> Create User: Failed");
        return res.render("createUserPage", { message: "Create User Failed" });
    }
    res.render("createUserPage", { message: "" });
}

// About Page logical
const getAboutPage = async (req, res) => {
    res.render("aboutPage");
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCreateUser: getCreateUser,
    postCreateUser: postCreateUser,
}