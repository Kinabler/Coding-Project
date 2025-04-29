const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var appRoot = require("app-root-path");
const { getHomePage, getAboutPage, getCreateUser, postCreateUser, postUpdateUser, postUpdateUserById, postDeleteUser, uploadPage, postUploadFile } = require("../controllers/controller");

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter }).array('profile-pic', 2); // multiple file upload

router.get("/", getHomePage);
router.get("/create-user", getCreateUser);
router.post("/create", postCreateUser);
router.post("/update", postUpdateUser);
router.post("/update/user/:id", postUpdateUserById);
router.post("/delete/user/:id", postDeleteUser);
router.get("/upload", uploadPage);
router.post("/upload-file", (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
            res.send("<script>alert('Many file is not allowed!'); window.location.href='/upload';</script>");
        } else if (err) {
            res.send(err);
        } else {
            next();
        }
    });
}, postUploadFile);
router.get("/about", getAboutPage);

module.exports = router;