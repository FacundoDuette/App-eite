import express from 'express';
import reservaController from '../controllers/reserva.controller.js'

const router = express.Router();

//Crear reserva
router.post('/', reservaController.createReserva);

//Obtener todas las reservas
router.get('/', reservaController.getAllReservas);

//Obtener reserva por id de reserva
router.get('/:id', reservaController.getReservaById);

//Obtener reservas por id de usuario
router.get('/user/:id', reservaController.getReservaByUserId);

//Obtener reservas por id de alojamiento
router.get('/host/:id', reservaController.getReservaByAlojamientoId);

//Modificar reserva
router.patch('/:id')

//Eliminar reserva
router.delete('/:id')

export default router;