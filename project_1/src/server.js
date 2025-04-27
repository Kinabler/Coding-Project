require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const connection = require('./config/database');

const app = express();
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

// Config express json
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// config template engine
configViewEngine(app, express);

// Init Router
app.use("/", webRouter);

// Listening
app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});