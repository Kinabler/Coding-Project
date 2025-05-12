const express = require('express');

const rootApi = async (req, res) => {
    res.status(200).json({
        message: "Welcome to the API",
        version: "1.0.0",
        status: "success",
    })
}

module.exports = {
    rootApi: rootApi,
}