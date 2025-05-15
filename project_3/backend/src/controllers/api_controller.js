const { createUserService } = require('../services/User_CRUDService');

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

module.exports = {
    rootApi: rootApi,
    createUser: createUser,
}