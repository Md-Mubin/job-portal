require('dotenv').config()
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const router = require('./router');
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true
}));
app.use(router)

db()

app.listen(8000, console.log("Server Connected"))