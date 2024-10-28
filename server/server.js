import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';    

import conectarDB from './config/mongoose.config.js';
import rutasUsuario from './src/routes/usuario.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use('/api/usuario', rutasUsuario);

conectarDB();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});