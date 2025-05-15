const user = require('../models/user');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const createUserService = async (email, username, password) => {
    // Hash password before saving
    const hashPassword = await bcrypt.hash(password, saltRounds);

    try {
        let result = await user.create({
            email: email,
            username: username,
            password: hashPassword,
            role: "user",
        })
        return result;
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return (`This ${field} is already taken, please choose another one.`);
        }
        console.error("Error creating user:", error);
        return error;
    }
}

const loginService = async (email, password) => {
    try {
        // fetch user by email and return one row
        const userData = await user.findOne({ email: email });
        if (!userData) {
            return {
                EC: 0,
                EM: "Email/Password is invalid",
            }
        } else {
            // Compare password
            const isMatch = await bcrypt.compare(password, userData.password);
            if (!isMatch) {
                return {
                    EC: 2,
                    EM: "Email/Password is invalid",
                }
            } else {
                // Create JWT access token
                return "Created JWT access token";
            }
        }
    } catch (error) {
        console.error("Error finding user:", error);
        return error;
    }
}
module.exports = {
    createUserService: createUserService,
    loginService: loginService,
}