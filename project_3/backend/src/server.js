const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const fs = require('fs');
const webRoutes = require('./routes/web_routes');
const apiRoutes = require('./routes/api_routes');
const configViewEngine = require('./configs/viewEngine');

const app = express();
host = process.env.HOST || 'localhost';
port = process.env.PORT || 8000;

//Configure view engine
configViewEngine(app, express);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for logging requests
const accessLogStream = fs.createWriteStream('./src/logs/access.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Initialize routes
app.use('/', webRoutes);
app.use('/api/v1/', apiRoutes);

(async () => {
    app.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);

    })
})(); 