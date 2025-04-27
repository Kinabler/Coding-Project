const connection = require("../config/database")

const getAllUsers = async () => {
    const [results, fields] = await connection.query("SELECT * FROM users",);
    return results;
}

const postAddUser = async (email, name, city) => {
    const [results, fields] = await connection.query(
        "INSERT INTO users(email, name, city) VALUES(?, ?, ?)",
        [email, name, city],
    );
    return results;
}

const getUserById = async (userId) => {
    const [results, fields] = await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [userId],
    );
    return results;
}

const UpdateUserById = async (id, email, name, city) => {
    const [results, fields] = await connection.query(
        "UPDATE users SET email = ?, name = ?, city = ? WHERE id = ?",
        [email, name, city, id],
    );
    return results;
}

const DeleteById = async (userId) => {
    const [result, fields] = await connection.query(
        "DELETE FROM users WHERE id = ?",
        [userId],
    );
    return result;
}

module.exports = {
    getAllUsers: getAllUsers,
    postAddUser: postAddUser,
    getUserById: getUserById,
    UpdateUserById: UpdateUserById,
    DeleteById: DeleteById,
}