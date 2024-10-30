import reservas from '../models/reserva.model.js';
import usuariosController from '../controllers/usuario.controller.js';                      //Necesario para verificación de usuario
// import alojamientosController from '../controllers/alojamientos.controller.js';             //Necesario para verioficación de alojamiento

const createReserva = async (req, res) => {
    console.log('Creando una reserva')
    try {
        const { userId, alojamientoId, fechaInicio, fechaFin, cantidadHuespedes, precio } = req.body;
        if (usuariosController.obtenerPorId(userId).status != 200) {                            //verificación si existe el usuario
            return res.status(400).json({ message: 'El usuario no existe' })
        }
        // if(!alojamientosController.alojamientoPorID(alojamientoId).status != 200){      //verificación si existe el Alojamiento
        //     return res.status(400).json({message: 'El alojamiento no existe'})
        // }
        const reserva = await reservas.create({ userId, alojamientoId, fechaInicio, fechaFin, cantidadHuespedes, precio });
        const nuevaReserva = await reserva.save();
        if (!nuevaReserva) {
            return res.status(500).json({ message: 'Error al crear la reserva' })
        }
        res.status(201).json({ message: 'Reserva creada', reserva: nuevaReserva })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la reserva' })
        return;
    }
}

const getAllReservas = async (req, res) => {
    console.log('obtenerTodasLasReservas')
    try {
        const reservas = await reservas.find();
        if (!reservas) {
            return res.status(404).json({ message: 'No hay reservas' })
        }
        res.status(200).json({ message: 'Reservas obtenidas', reservas })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las reservas' })
        return;
    }
}

const getReservaById = async (req, res) => {
    console.log('obtenerReservaPorId')
    try {
        const { id } = req.params;
        const reserva = await reservas.findById(id);
        if (!reserva) {
            return res.status(404).json({ message: 'No se encontró la reserva' })
        }
        res.status(200).json({ message: 'Reserva obtenida', reserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la reserva' })
        return;
    }
}

const getReservaByUserId = async (req, res) => {
    console.log('obtenerReservaPorUserId')
    try {
        const { id } = req.params;
        const reserva = await reservas.find({ user: id });
        if (!reserva) {
            return res.status(404).json({ message: 'No se encontró la reserva' })
        }
        res.status(200).json({ message: 'Reserva obtenida', reserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la reserva' })
        return;
    }
}

const getReservaByAlojamientoId = async (req, res) => {
    console.log('obtenerReservaPorAlojamientoId')
    try {
        const { id } = req.params;
        const reserva = await reservas.find({ alojamiento: id });
        if (!reserva) {
            return res.status(404).json({ message: 'No se encontró la reserva' })
        }
        res.status(200).json({ message: 'Reserva obtenida', reserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la reserva' })
        return;
    }
}

const updateReserva = async (req, res) => {
    console.log('updateReserva')
    try {
        const { id } = req.params;
        const { userId, alojamientoId, fechaInicio, fechaFin, cantidadHuespedes, precio } = req.body;
        if (usuariosController.obtenerPorId(userId).status != 200) {                            //verificación si existe el usuario
            return res.status(400).json({ message: 'El usuario no existe' })
        }
        // if(!alojamientosController.alojamientoPorID(alojamientoId).status != 200){      //verificación si existe el Alojamiento
        //     return res.status(400).json({message: 'El alojamiento no existe'})
        // }
        const reserva = await reservas.findByIdAndUpdate(id, { userId, alojamientoId, fechaInicio, fechaFin, cantidadHuespedes, precio }, { new: true, runValidators: true });
        if (!reserva) {
            return res.status(404).json({ message: 'No se encontró la reserva' })
        }
        res.status(200).json({ message: 'Reserva actualizada', reserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la reserva' })
        return;
    }
}

const deleteReserva = async (req, res) => {
    console.log('deleteReserva')
    try {
        const { id } = req.params;
        const reserva = await reservas.findByIdAndDelete(id);
        if (!reserva) {
            return res.status(404).json({ message: 'No se encontró la reserva' })
        }
        res.status(200).json({ message: 'Reserva eliminada', reserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la reserva' })
        return;
    }
}

export default {
    createReserva,
    getAllReservas,
    getReservaById,
    getReservaByUserId,
    getReservaByAlojamientoId,
    updateReserva,
    deleteReserva
}