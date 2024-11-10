import reservas from '../models/reserva.model.js';
import users from '../models/usuario.model.js';
import alojamientos from '../models/alojamiento.model.js';

const createReserva = async (req, res) => {
    console.log('Creando una reserva')
    try {
        const { place, user, checkIn, checkOut, name, phone } = req.body;
        let { price } = req.body;

        // Verificación si el user existe
        if (user == "" || user == undefined || user == null) {
            return res.status(400).json({ message: 'El user es requerido' });
        }
        const userId = await users.findById(user);
        if (!userId) {
            return res.status(400).json({ message: 'El user no existe' });
        }

        // Verificación si el alojamiento existe
        if (place == "" || place == undefined || place == null) {
            return res.status(400).json({ message: 'El alojamiento es requerido' });
        }
        const hostId = await alojamientos.findById(place);
        if (!hostId) {
            return res.status(400).json({ message: 'El alojamiento no existe' });
        }

        price = hostId.price; // Definimos el valor de la reserva igual al valor del costo del alojamiento, esto sirve de registro en caso el costo del alojamiento se modifique a futuro.

        // Verificación de fechas disponibles
        // const verifAloj = await reservas.find({ place: place });
        // if (verifAloj.length > 0) {
        //     for (let i = 0; i < verifAloj.length; i++) {
        //         if (checkIn <= verifAloj[i].checkOut) {
        //             return res.status(400).json({ message: 'El alojamiento ya se encuentra ocupado para la fecha de inicio seleccionada' });
        //         }
        //         if (checkOut >= verifAloj[i].checkIn){
        //             return res.status(400).json({ message: 'El alojamiento ya se encuentra ocupado para la fecha de fin seleccionada' });
        //         }
        //     }
        // }

        // pendiente

        // Se crea la Reserva con los datos de user y alojamientos ya verificados
        const reserva = await reservas.create({ user, place, checkIn, checkOut, price, name, phone });
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
        res.status(200).json({ listaReservas })
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
        res.status(200).json({ reserva })
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
        return;
    }
}

// const getReservaByuser = async (req, res) => {
//     console.log('obtenerReservaPoruser')
//     try {
//         const { id } = req.params;
//         const listaReservas = await reservas.find({ user: id });
//         if (listaReservas.length === 0) {
//             return res.status(404).json({ message: 'No se encontró nungina reserva para este user' })
//         }
//         res.status(200).json({ listaReservas })
//         return;
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error })
//         return;
//     }
// }

const getReservaByalojamiento = async (req, res) => {
    console.log('obtenerReservaPoralojamiento')
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

const updateReserva = async (req, res) => {
    console.log('updateReserva')
    try {
        const { id } = req.params;
        const { place ,user,checkIn,checkOut,name,phone,price } = req.body;

        //Verificación si el user existe
        if (user == "" || user == undefined || user == null) {
            return res.status(400).json({ message: 'El user es requerido' });
        }
        const userId = await users.findById(user);
        if (!userId) {
            return res.status(400).json({ message: 'El user no existe' });
        }

        //Verificación si el alojamiento existe
        if (place == "" || place == undefined || place == null) {
            return res.status(400).json({ message: 'El alojamiento es requerido' });
        }
        const hostId = await alojamientos.findById(place);
        if (!hostId) {
            return res.status(400).json({ message: 'El alojamiento no existe' });
        }

        // //Verificación de cantidadHuespedes disponibles
        // if (cantidadHuespedes > hostId.detalles.cantidadPersonas) {
        //     return res.status(400).json({ message: 'La cantidad de huespedes supera la capacidad del alojamiento' });
        // }

        //Se procede a intentar la actualización
        const reserva = await reservas.findByIdAndUpdate(id, { place ,user,checkIn,checkOut,name,phone,price }, { new: true, runValidators: true });
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
    console.log('deleteReserva')
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

export default {
    createReserva,
    getAllReservas,
    getReservaById,
    // getReservaByuser,
    getReservaByalojamiento,
    updateReserva,
    deleteReserva
}