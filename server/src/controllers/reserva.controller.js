import reservas from '../models/reserva.model.js';
import usuarios from '../models/usuario.model.js';
import alojamientos from '../models/alojamiento.model.js';

const createReserva = async (req, res) => {
    try {
        const { usuario, alojamiento, fechaInicio, fechaFin, cantidadHuespedes, notas } = req.body;

        console.log(usuario, alojamiento, fechaInicio, fechaFin, cantidadHuespedes, notas)
        //Verificación si el usuario existe
        if (usuario == "" || usuario == undefined || usuario == null) {
            return res.status(400).json({ message: 'El usuario es requerido' });
        }
        const userId = await usuarios.findById(usuario);
        if (!userId) {
            return res.status(400).json({ message: 'El usuario no existe' });
        }

        //Verificación si el alojamiento existe
        if (alojamiento == "" || alojamiento == undefined || alojamiento == null) {
            return res.status(400).json({ message: 'El alojamiento es requerido' });
        }
        const hostId = await alojamientos.findById(alojamiento);
        if (!hostId) {
            return res.status(400).json({ message: 'El alojamiento no existe' });
            console.log(hostId)
        }

        //Verificación de cantidadHuespedes disponibles
        if (cantidadHuespedes > hostId.cantidadHuespedes) {
            return res.status(400).json({ message: 'La cantidad de huespedes supera la capacidad del alojamiento' });
        }

        const precio = hostId.precioPorNoche // Definimos el valor de la reserva igual al valor del costo del alojamiento, esto sirve de retgistro en caso el costo del alojamiento se modifique a futuro.


        //Verificación de fechas disponibles
        const verifAloj = await reservas.find({ alojamiento: alojamiento });
        if (verifAloj.length > 0) {
            for (let i = 0; i < verifAloj.length; i++) {
                if (fechaInicio <= verifAloj[i].fechaFin) {
                    return res.status(400).json({ message: 'El alojamiento ya se encuentra ocupado para la fecha de inicio seleccionada' });
                }
                if (fechaFin >= verifAloj[i].fechaInicio) {
                    return res.status(400).json({ message: 'El alojamiento ya se encuentra ocupado para la fecha de fin seleccionada' });
                }
            }
        }

        //pendiente

        //Se crea la Reserva con los datos de user y alojamientos ya verificados
        const reserva = await reservas.create({ usuario, alojamiento, fechaInicio, fechaFin, cantidadHuespedes, precio, notas });
        const nuevaReserva = await reserva.save();
        if (!nuevaReserva) {
            return res.status(500).json({ error })
        }
        res.status(201).json({ message: 'Reserva creada', reserva: nuevaReserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'prueba de kk' } })
        return;
    }
}

const getAllReservas = async (req, res) => {
    try {
        const listaReservas = await reservas.find();
        if (listaReservas.length === 0) {
            return res.status(404).json({ message: 'No hay reservas' })
        }
        res.status(200).json({ listaReservas })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
        return;
    }
}

const getReservaById = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservas.findById(id);
        if (!reserva) {
            return res.status(404).json({ message: 'No se encontró la reserva' })
        }
        res.status(200).json({ reserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
        return;
    }
}

const getReservaByusuario = async (req, res) => {
    try {
        const { id } = req.params;
        const listaReservas = await reservas.find({ usuario: id }).populate('alojamiento', 'titulo direccion'); // Incluye título y dirección

        if (listaReservas.length === 0) {
            return res.status(404).json({ message: 'No se encontró ninguna reserva para este usuario' });
        }

        res.status(200).json({ listaReservas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};

const getReservaByalojamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const listaReservas = await reservas.find({ alojamiento: id });
        if (listaReservas.length === 0) {
            return res.status(404).json({ message: 'No se encontró ninguna reserva para este alojamiento' })
        }
        res.status(200).json({ listaReservas })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
        return;
    }
}

//Obtener fechas reservadas de un alojamiento
const getFechasReservadasByIdAlojamiento = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'El id del alojamiento es obligatorio' });
        }
        const listaReservas = await reservas.find({ alojamiento: id });
        if (listaReservas.length === 0) {
            return res.status(404).json({ message: 'No se encontró ninguna reserva para este alojamiento' })
        }
        return res.status(200).json({ listaReservas })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
        return;
    }
}

const updateReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario, alojamiento, fechaInicio, fechaFin, cantidadHuespedes, precio, descripcion, notas } = req.body;

        //Verificación si el usuario existe
        if (usuario == "" || usuario == undefined || usuario == null) {
            return res.status(400).json({ message: 'El usuario es requerido' });
        }
        const userId = await usuarios.findById(usuario);
        if (!userId) {
            return res.status(400).json({ message: 'El usuario no existe' });
        }

        //Verificación si el alojamiento existe
        if (alojamiento == "" || alojamiento == undefined || alojamiento == null) {
            return res.status(400).json({ message: 'El alojamiento es requerido' });
        }
        const hostId = await alojamientos.findById(alojamiento);
        if (!hostId) {
            return res.status(400).json({ message: 'El alojamiento no existe' });
        }

        //Verificación de cantidadHuespedes disponibles
        if (cantidadHuespedes > hostId.detalles.cantidadPersonas) {
            return res.status(400).json({ message: 'La cantidad de huespedes supera la capacidad del alojamiento' });
        }

        //Se procede a intentar la actualización
        const reserva = await reservas.findByIdAndUpdate(id, { usuario, alojamiento, fechaInicio, fechaFin, cantidadHuespedes, precio, descripcion, notas }, { new: true, runValidators: true });
        if (!reserva) {
            return res.status(404).json({ message: 'No se encontró la reserva' })
        }
        res.status(200).json({ reserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
        return;
    }
}

const deleteReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservas.findByIdAndDelete(id);
        if (!reserva) {
            return res.status(404).json({ message: 'No se encontró la reserva' })
        }
        res.status(200).json({ reserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
        return;
    }
}

const obtenerFechasReservadas = async (req, res) => {
    try {
        const { alojamientoId } = req.params;
        // Buscar reservas para el alojamiento específico
        const reservasExistentes = await reservas.find({ alojamiento: alojamientoId });

        // Crear un array de rangos de fechas reservadas
        const fechasReservadas = reservasExistentes.map(reserva => ({
            fechaInicio: reserva.fechaInicio,
            fechaFin: reserva.fechaFin
        }));

        res.status(200).json(fechasReservadas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las fechas reservadas." });
    }
};

export default {
    createReserva,
    getAllReservas,
    getReservaById,
    getReservaByusuario,
    getReservaByalojamiento,
    getFechasReservadasByIdAlojamiento,
    updateReserva,
    deleteReserva,
    obtenerFechasReservadas
}