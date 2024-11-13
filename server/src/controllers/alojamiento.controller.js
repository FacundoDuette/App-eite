import alojamientos from "../models/alojamiento.model.js";
import usuarios from "../models/usuario.model.js";

const obtenerTodosLosAlojamientos = async (req, res) => {
    try {
        const lista = await alojamientos.find();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const obtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const alojamiento = await alojamientos.findById(id);
        if (alojamiento) {
            res.json(alojamiento);
        } else {
            res.status(404).json({ message: 'Alojamiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }

};

const obtenerPorUserId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'El Usuario es requerido' });
        }
        const existe = await usuarios.findById(id);
        if (!existe) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const lista = await alojamientos.find({ usuarioId: id });
        if (lista.length) {
            res.json(lista);
        } else {
            res.status(404).json({ message: 'No hay alojamientos para este usuario' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const borrarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const alojamiento = await alojamientos.findByIdAndDelete(id);
        if (alojamiento) {
            res.json(alojamiento);
        } else {
            res.status(404).json({ message: 'Alojamiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }

};

const modificarAlojamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const alojamientoData = req.body;
        const alojamiento = await alojamientos.findByIdAndUpdate(id, alojamientoData, { new: true, runValidators: true });
        if (alojamiento) {
            res.json(alojamiento);
        } else {
            res.status(404).json({ message: 'Alojamiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const agregarAlojamiento = async (req, res) => {
    try {
        const nuevoAlojamiento = req.body.data;
        const alojamiento = new alojamientos(nuevoAlojamiento);
        await alojamiento.save();
        res.status(201).json(alojamiento);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default {
    obtenerTodosLosAlojamientos,
    obtenerPorId,
    obtenerPorUserId,
    borrarPorId,
    modificarAlojamiento,
    agregarAlojamiento
};