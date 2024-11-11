import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env.MONGO_URL);
const URL_MONGO = process.env.MONGO_URL;
// console.log(URL_MONGO);
const conectarDB = async () => {
    try {
        await mongoose.connect(URL_MONGO, {
            dbName: "Appeite",
        })
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error('Error al conectar con la base de datos', error);
        throw error;
    }
};

export default conectarDB;