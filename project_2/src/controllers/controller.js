
const pool = require('../configs/database');
const multer = require('multer');

const { queryCheckConnection, queryGetAllUser, queryCreateUser, queryCheckUserExists, queryGetUserById, queryUpdateUserById, queryDeleteUserById } = require('../services/CRUDService');

// Home Page logical
const getHomePage = async (req, res) => {
    // Check connection to database
    console.log(await queryCheckConnection ? ">> Connection to Database: OK" : ">> Connection to Database: Failed");
    // Get all users from database
    let userData = await queryGetAllUser();
    if (userData.length > 0) {
        console.log(">>> Get All User from Database: OK");
    } else {
        console.log(">>> Get All User from Database: Failed");
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
        return res.render("createUserPage", { message: "Email/Username already exists" });
    }
    // Create user
    let result = await queryCreateUser(email, username, password);
    if (result) {
        return res.render("createUserPage", { message: "Create User Successfully" });
    } else {
        return res.render("createUserPage", { message: "Create User Failed" });
    }
    res.render("createUserPage", { message: "" });
}

// Update User Page logical
const postUpdateUser = async (req, res) => {
    let userId = req.body.id;
    let userData = await queryGetUserById(userId);
    console.log(">>> Get User from Database: OK");
    res.render("updateUserPage", { user: userData[0] });
}

// Update User logical
const postUpdateUserById = async (req, res) => {
    let { id, email, username, password } = req.body;
    // Update user
    let result = await queryUpdateUserById(id, email, username, password);
    if (result) {
        return res.send("<script>alert('Update User Successfully'); window.location.href='/';</script>");
    } else {
        return res.send("<script>alert('Update User Failed'); window.location.href='/';</script>");
    }
}

// Delete User logical
const postDeleteUser = async (req, res) => {
    let userId = req.params.id;
    // Delete user
    let result = await queryDeleteUserById(userId);
    if (result) {
        return res.send("<script>alert('Delete User Successfully'); window.location.href='/';</script>");
    } else {
        return res.send("<script>alert('Delete User Failed'); window.location.href='/';</script>");
    }
}

// Upload Page logical
const uploadPage = async (req, res) => {
    res.render("uploadFilePage");
}

// const upload = multer().single('profile-pic'); // single file upload

const postUploadFile = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.files) {
        return res.send("Please select a file to upload");
    } else if (req.multerError) {
        return res.send(req.multerError);
    }
    // Update the image path to match your static files directory structure
    let result = "Here is these files has been uploaded: <hr />";
    req.files.forEach((file) => {
        result += `<img src="/uploads/${file.filename}" width="200px" height="200px" />`;
    });
    result += "<hr /> <a href='/upload'>Upload more files</a>";
    return res.send(result);
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
    postUpdateUser: postUpdateUser,
    postUpdateUserById: postUpdateUserById,
    postDeleteUser: postDeleteUser,
    uploadPage: uploadPage,
    postUploadFile: postUploadFile,
}
