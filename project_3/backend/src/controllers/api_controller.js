const { createUserService, loginService, getUsersService } = require('../services/User_CRUDService');

const rootApi = async (req, res) => {
    res.status(200).json({
        message: "Welcome to the API",
        version: "1.0.0",
        status: "success",
    })
}

const createUser = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const message = await createUserService(email, username, password);

    return res.status(200).json({ message });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const message = await loginService(email, password);

    return res.status(200).json({ message });
}

const getUsers = async (req, res) => {
    const message = await getUsersService();
    return res.status(200).json(message);
}

const getAccount = async (req, res) => {
    return res.status(200).json(req.user);
}

module.exports = {
    rootApi: rootApi,
    createUser: createUser,
    loginUser: loginUser,
    getUsers: getUsers,
    getAccount: getAccount,
}