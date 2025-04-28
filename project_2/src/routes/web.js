const express = require("express");
const router = express.Router();
const { getHomePage, getAboutPage, getCreateUser, postCreateUser } = require("../controllers/controller");

router.get("/", getHomePage);
router.get("/create-user", getCreateUser);
router.post("/create", postCreateUser);
router.get("/about", getAboutPage);

module.exports = router;