import express from 'express';
import reservaController from '../controllers/reserva.controller.js'
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

//Crear reserva
router.post('/'/* , authenticate */, reservaController.createReserva);

//Obtener todas las reservas
router.get('/',/* authenticate, */ reservaController.getAllReservas);

//Obtener reserva por id de reserva
router.get('/:id',/* authenticate, */ reservaController.getReservaById);

//Obtener reservas por id de usuario
router.get('/user/:id',/* authenticate, */ reservaController.getReservaByusuario);

//Obtener reservas por id de alojamiento
router.get('/host/:id',/* authenticate, */ reservaController.getReservaByalojamiento);

//Obtener fechas reservadas por id de alojamiento
router.get('/fechas-reservadas/:id',/* authenticate, */ reservaController.getFechasReservadasByIdAlojamiento)

//Modificar reserva
router.patch('/:id',/* authenticate, */ reservaController.updateReserva)

//Eliminar reserva
router.delete('/:id',/* authenticate, */ reservaController.deleteReserva)

// Obtener fechas reservadas por id de alojamiento
router.get('/fechas-reservadas/:alojamientoId', reservaController.obtenerFechasReservadas);

export default router;