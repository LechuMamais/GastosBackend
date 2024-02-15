require("dotenv").config();
const express = require('express');
const { connectDB } = require("./src/config/db");
const gastosRouter = require("./src/api/routes/gastos");
const app = express();
const port = 3000;
connectDB();
app.use(express.json());

app.use("/api/gastos", gastosRouter);

app.use("*", (req, res, next) => {
    return res.status(404).json("Route Not Found")
})

app.listen(port), ()=>{
    console.log("http://localhost:3000");
}