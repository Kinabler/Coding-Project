require('dotenv').config();
const express = require('express');
const configViewEngine = require('./configs/viewEngine');
const webRoute = require('./routes/web');
const apiRoute = require('./routes/api');
const morgan = require('morgan');
const fs = require('fs');


const app = express();
const port = process.env.PORT || 8081;
const host = process.env.HOST;

// Config view engine
configViewEngine(app, express);

// Express Json config - MOVED UP before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Init morgan logger
var accessLogStream = fs.createWriteStream('./src/logs/access.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Init web,api routes
app.use("/", webRoute);
app.use("/api/v1/", apiRoute);

// Handler Middleware 404 Not Found: Must be placed after all routes
app.use((req, res) => {
    return res.render("404Page");
});

// Listening on port 8080
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});