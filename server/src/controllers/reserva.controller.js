import reservas from '../models/reserva.model.js';
import usuarios from '../models/usuario.model.js';
import alojamientos from '../models/alojamiento.model.js';

const createReserva = async (req, res) => {
    console.log('Creando una reserva')
    try {
        const { usuario, alojamiento, fechaInicio, fechaFin, cantidadHuespedes, precio } = req.body;

        //Evaluación si el usuario existe
        if (usuario == "" || usuario == undefined || usuario == null) {
            return res.status(400).json({ message: 'El usuario es requerido' });
        }
        const userId = await usuarios.findById(usuario);
        if (!userId) {
            return res.status(400).json({ message: 'El usuario no existe' });
        }

        //Evaluación si el alojamiento existe
        if (alojamiento == "" || alojamiento == undefined || alojamiento == null) {
            return res.status(400).json({ message: 'El alojamiento es requerido' });
        }
        const hostId = await alojamientos.findById(alojamiento);
        if (!hostId) {
            return res.status(400).json({ message: 'El alojamiento no existe' });
        }

        //Se crea la Reserva con los datos de user y alojamientos ya verificados
        const reserva = await reservas.create({ userId, hostId, fechaInicio, fechaFin, cantidadHuespedes, precio });
        const nuevaReserva = await reserva.save();
        if (!nuevaReserva) {
            return res.status(500).json({ error })
        }
        res.status(201).json({ message: 'Reserva creada', reserva: nuevaReserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
        return;
    }
}

const getAllReservas = async (req, res) => {
    console.log('obtenerTodasLasReservas')
    try {
        const listaReservas = await reservas.find();
        if (listaReservas.length === 0) {
            return res.status(404).json({ message: 'No hay reservas' })
        }
        res.status(200).json({ message: 'Reservas obtenidas', listaReservas })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
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
        res.status(500).json({ error })
        return;
    }
}

const getReservaByusuario = async (req, res) => {
    console.log('obtenerReservaPorusuario')
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
        res.status(500).json({ error })
        return;
    }
}

const getReservaByalojamiento = async (req, res) => {
    console.log('obtenerReservaPoralojamiento')
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
        res.status(500).json({ error })
        return;
    }
}

const updateReserva = async (req, res) => {
    console.log('updateReserva')
    try {
        const { id } = req.params;
        const { usuario, alojamiento, fechaInicio, fechaFin, cantidadHuespedes, precio } = req.body;
        if (usuariosController.obtenerPorId(usuario).status != 200) {                            //verificación si existe el usuario
            return res.status(400).json({ message: 'El usuario no existe' })
        }
        // if(!alojamientosController.alojamientoPorID(alojamiento).status != 200){      //verificación si existe el Alojamiento
        //     return res.status(400).json({message: 'El alojamiento no existe'})
        // }
        const reserva = await reservas.findByIdAndUpdate(id, { usuario, alojamiento, fechaInicio, fechaFin, cantidadHuespedes, precio }, { new: true, runValidators: true });
        if (!reserva) {
            return res.status(404).json({ message: 'No se encontró la reserva' })
        }
        res.status(200).json({ message: 'Reserva actualizada', reserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
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
        res.status(500).json({ error })
        return;
    }
}

export default {
    createReserva,
    getAllReservas,
    getReservaById,
    getReservaByusuario,
    getReservaByalojamiento,
    updateReserva,
    deleteReserva
}