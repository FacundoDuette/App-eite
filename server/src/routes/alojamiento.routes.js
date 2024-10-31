import express from 'express';
import ControladorAlojamiento from '../controllers/alojamiento.controller.js';

const rutasAlojamiento = express.Router();

rutasAlojamiento.get('/', ControladorAlojamiento.obtenerTodosLosAlojamientos);
rutasAlojamiento.get('/:id',ControladorAlojamiento.obtenerPorId);
rutasAlojamiento.delete('/:id',ControladorAlojamiento.borrarPorId);
rutasAlojamiento.patch('/:id',ControladorAlojamiento.modificarAlojamiento);
rutasAlojamiento.post('/',ControladorAlojamiento.agregarAlojamiento);

export default rutasAlojamiento;