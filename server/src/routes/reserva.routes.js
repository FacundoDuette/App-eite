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
router.get('/user/:id', reservaController.getReservaByusuario);

//Obtener reservas por id de alojamiento
router.get('/host/:id', reservaController.getReservaByalojamiento);

//Modificar reserva
router.patch('/:id', reservaController.updateReserva)

//Eliminar reserva
router.delete('/:id', reservaController.deleteReserva)

export default router;