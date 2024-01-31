const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("conectado a la base de datos");
    } catch (error) {
        console.log("error al conectar con la base de datos");
        console.log(error.message);
    }
}

module.exports = { connectDB }