const express = require("express");
const router = express.Router();
const { getHomePage, getAboutPage, getCreateUser, postCreateUser, postUpdateUser, postUpdateUserById, postDeleteUser } = require("../controllers/controller");

router.get("/", getHomePage);
router.get("/create-user", getCreateUser);
router.post("/create", postCreateUser);
router.post("/update", postUpdateUser);
router.post("/update/user/:id", postUpdateUserById);
router.post("/delete/user/:id", postDeleteUser);
router.get("/about", getAboutPage);

module.exports = router;