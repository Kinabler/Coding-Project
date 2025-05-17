const express = require("express");
require("dotenv").config();
const routerAPI = require("./routes/api_router");
const configViewEngine = require("./configs/viewEngine");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8001;

const app = express();

// Config view engine
configViewEngine(app, express);

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Init api router
app.use("/v1/api", routerAPI);

app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});