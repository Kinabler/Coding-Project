require('dotenv').config();
const express = require('express');
const configViewEngine = require('./configs/viewEngine');
const webRoute = require('./routes/web');

const app = express();
const port = process.env.PORT || 8081;
const host = process.env.HOST;

// Config view engine
configViewEngine(app, express);

// Express Json config - MOVED UP before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Route config
app.use("/", webRoute);

// Listening on port 8080
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});