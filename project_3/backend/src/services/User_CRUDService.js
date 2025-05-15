const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
                EC: 1,
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
                const payload = {
                    id: userData._id,
                    email: userData.email,
                    role: userData.role,
                }
                // Create JWT access token
                const accessToken = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                        algorithm: 'HS256', // Specify the algorithm
                    }
                )
                return {
                    EC: 0,
                    EM: "Login successful",
                    accessToken,
                    user: {
                        email: userData.email,
                        username: userData.username,
                        role: userData.role,
                    },
                }
            };
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