const pool = require('../configs/database');
const { queryCheckConnection, queryGetAllUser, queryCreateUser, queryCheckUserExists, queryGetUserById, queryUpdateUserById, queryDeleteUserById } = require('../services/CRUDService');

const getAllUsers = async (req, res) => {
    const result = await queryGetAllUser();
    res.status(200).json({
        message: "Get all users successfully",
        data: result
    })
}

const createUser = async (req, res) => {
    let { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({
            message: "Missing required fields",
        });
    }
    const result = await queryCreateUser(email, username, password);
    message = result ? "Create user successfully" : "Create user failed";
    return res.status(200).json({
        message: message,
    });
}

const editUser = async (req, res) => {
    let { id, email, username, password } = req.body;
    if (!id || !email || !username || !password) {
        return res.status(400).json({
            message: "Missing required fields",
        });
    }
    const result = await queryUpdateUserById(id, email, username, password);
    message = result ? "Update user successfully" : "Update user failed";
    return res.status(200).json({
        message: message,
    });
}

const deleteUser = async (req, res) => {
    let { id } = req.body;
    if (!id) {
        return res.status(400).json({
            message: "Missing required fields",
        });
    }
    const result = await queryDeleteUserById(id);
    message = result ? "Delete user successfully" : "Delete user failed";
    return res.status(200).json({
        message: message,
    });
}

module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    editUser: editUser,
    deleteUser: deleteUser,
}