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
        // // add message to result
        // result = {
        //     message: "User created successfully",
        //     data: result
        // }

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

module.exports = {
    createUserService: createUserService,
}