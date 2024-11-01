import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import conectarDB from './config/mongoose.config.js';
import rutasUsuario from './src/routes/usuario.routes.js';
import rutasReserva from './src/routes/reserva.routes.js';
import rutasAlojamiento from './src/routes/alojamiento.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
    }
));

const PORT = process.env.PORT || 8080;

app.use('/api/usuario', rutasUsuario);
app.use('/api/reserva', rutasReserva);
app.use('/api/alojamiento', rutasAlojamiento)
app.use('*', (req, res) => {
    res.status(404).json({ message: 'No se encuentra la ruta solicitada' });
})

conectarDB();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});