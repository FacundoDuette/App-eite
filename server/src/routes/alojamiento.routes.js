import express from 'express';
import ControladorAlojamiento from '../controllers/alojamiento.controller.js';
// import authenticate from '../../config/jwt.config.js';


const rutasAlojamiento = express.Router();

rutasAlojamiento.get('/'/* , authenticate */, ControladorAlojamiento.obtenerTodosLosAlojamientos);
rutasAlojamiento.get('/:id'/* , authenticate */, ControladorAlojamiento.obtenerPorId);
rutasAlojamiento.delete('/:id'/* , authenticate */, ControladorAlojamiento.borrarPorId);
rutasAlojamiento.patch('/:id'/* , authenticate */, ControladorAlojamiento.modificarAlojamiento);
rutasAlojamiento.post('/'/* , authenticate */, ControladorAlojamiento.agregarAlojamiento);

export default rutasAlojamiento;