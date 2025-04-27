const express = require('express');
const router = express.Router();
const { getHomePage, getAboutPage, postCreateUser, getCreatePage, getEditPage, postUpdateUser, postDeleteUser } = require("../controllers/homeController");

router.get("/", getHomePage);
router.get("/about", getAboutPage);
router.get("/create", getCreatePage);
router.post("/create-user", postCreateUser);
router.get("/edit/user/:id", getEditPage);
router.post("/update-user/:id", postUpdateUser);
router.post("/delete/user/:id", postDeleteUser);

module.exports = router;