const connection = require('../config/database');
const { getAllUsers, postAddUser, getUserById, UpdateUserById, DeleteById } = require('../services/CRUDService');

const getHomePage = async (req, res) => {
    let results = await getAllUsers();
    return res.render("homepage.ejs", { listUsers: results });
}

const getAboutPage = (req, res) => {
    res.render("about.ejs");
}

const postCreateUser = async (req, res) => {
    let { email, name, city } = req.body;
    const results = await postAddUser(email, name, city);
    if (results.affectedRows === 0) {
        return res.send("<script>alert('Create user failed'); window.location.href='/create'</script>");
    } else {
        return res.send("<script>alert('Create user success'); window.location.href='/create'</script>");
    }
}

const getCreatePage = (req, res) => {
    return res.render("create.ejs");
}

const getEditPage = async (req, res) => {
    let userId = req.params.id;
    let results = await getUserById(userId);
    let userById = results && results.length > 0 ? results[0] : {};
    if (results.length === 0) {
        return res.send("<script>alert('User not found'); window.location.href='/'</script>");
    }
    return res.render("edit.ejs", { userEdit: userById });
}

const postUpdateUser = async (req, res) => {
    let { email, name, city, id } = req.body;
    const results = await UpdateUserById(id, email, name, city);
    if (results.affectedRows === 0) {
        return res.send("<script>alert('Update user failed'); window.location.href='/'</script>");
    } else {
        return res.send("<script>alert('Update user success'); window.location.href='/'</script>");
    }
}

const postDeleteUser = async (req, res) => {
    let id = req.params.id;
    const result = await DeleteById(id);
    if (result.affectedRows === 0) {
        return res.send("<script>alert('Delete user failed'); window.location.href='/'</script>");
    } else {
        return res.send("<script>alert('Delete user success'); window.location.href='/'</script>");
    }
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    postCreateUser: postCreateUser,
    getCreatePage: getCreatePage,
    getEditPage: getEditPage,
    postUpdateUser: postUpdateUser,
    postDeleteUser: postDeleteUser,
}