require("dotenv").config();
const express = require('express');
const { connectDB } = require("./src/config/db");
const gastosRouter = require("./src/api/routes/gastos");
const app = express();
connectDB();
app.use(express.json());

app.use("/api/gastos", gastosRouter);

app.use("*", (req, res, next) => {
    return res.status(404).json("Route Not Found")
})

app.listen(3000), ()=>{
    console.log("http://localhost:3000");
}