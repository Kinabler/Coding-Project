const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, editUser, deleteUser } = require('../controllers/api_controller');

router.get("/users", getAllUsers);      // Method: GET => READ Data
router.post("/create/user", createUser);  // Method: POST => CREATE Data
router.put('/edit/user', editUser); // Method: PUT => UPDATE Data
router.delete('/delete/user', deleteUser); // Method: DELETE => DELETE Data

module.exports = router;