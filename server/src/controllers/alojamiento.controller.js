import alojamientos from "../models/alojamiento.model.js";

const obtenerTodosLosAlojamientos = async (req, res) => {
    try {
        const lista = await alojamientos.find();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const obtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const alojamiento = await alojamientos.findById(id);
        if (alojamiento) {
            res.json(alojamiento);
        } else {
            res.status(404).json({ mensaje: 'Alojamiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({mensaje: error.message });
    }
    
};

const borrarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const alojamiento = await alojamientos.findByIdAndDelete(id);
        if (alojamiento) {
            res.json(alojamiento);
        } else {
            res.status(404).json({ mensaje: 'Alojamiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
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
            res.status(404).json({ mensaje: 'Alojamiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const agregarAlojamiento = async (req, res) => {
    try {
        const nuevoAlojamiento = req.body.data;
        const alojamiento = new alojamientos(nuevoAlojamiento);
        await alojamiento.save();
        res.status(201).json(alojamiento);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export default {
    obtenerTodosLosAlojamientos,
    obtenerPorId,
    borrarPorId,
    modificarAlojamiento,
    agregarAlojamiento
};