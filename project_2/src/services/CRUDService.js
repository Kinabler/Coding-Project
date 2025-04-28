const e = require('express');
const pool = require('../configs/database');

// Check connection to database
const queryCheckConnection = async () => {
    let [results] = await pool.query(`SELECT ?+? AS sum`, [2, 3]);
    return results[0].sum ? true : false;
}

// Get all users from database import to table
const queryGetAllUser = async () => {
    let [results] = await pool.query(`SELECT * FROM users`);
    if (results.length > 0) {
        return results;
    } else {
        return [];
    }
}

// Create User
const queryCreateUser = async (email, username, password) => {
    let [results] = await pool.query(`INSERT INTO users (email, username, password) VALUES (?, ?, ?)`, [email, username, password]);
    if (results.affectedRows > 0) {
        return true;
    } else {
        return false;
    }
}

// Check if user already exists
const queryCheckUserExists = async (email, username) => {
    let [results] = await pool.query(`SELECT * FROM users WHERE email = ? OR username = ?`, [email, username]);
    if (results.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Get user by id
const queryGetUserById = async (userId) => {
    let [results] = await pool.query(`SELECT * FROM users WHERE id = ?`, [userId]);
    if (results.length > 0) {
        return results;
    } else {
        return [];
    }
}

// Update User
const queryUpdateUserById = async (userId, email, username, password) => {
    let [results] = await pool.query(`UPDATE users SET email = ?, username = ?, password = ? WHERE id = ?`, [email, username, password, userId]);
    if (results.affectedRows > 0) {
        return true;
    } else {
        return false;
    }
}

// Delete User by Id
const queryDeleteUserById = async (userId) => {
    let [results] = await pool.query(`DELETE FROM users WHERE id = ?`, [userId]);
    if (results.affectedRows > 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    queryCheckConnection: queryCheckConnection,
    queryGetAllUser: queryGetAllUser,
    queryCreateUser: queryCreateUser,
    queryCheckUserExists: queryCheckUserExists,
    queryGetUserById: queryGetUserById,
    queryUpdateUserById: queryUpdateUserById,
    queryDeleteUserById: queryDeleteUserById,
}