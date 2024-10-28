import usuarios from "../models/usuario.model.js";
import bcrypt from 'bcrypt'; 


const agregarUsuario = async (req, res) => {
  try {
    const { contrasena, ...datosUsuario } = req.body;

    // Verifica que haya una contraseña
    if (!contrasena) {
      return res.status(400).json({ mensaje: "La contraseña es requerida" });
    }

    // Hashea la contraseña
    const contraseñaHasheada = await bcrypt.hash(contrasena, 10);
    const usuario = new usuarios({ ...datosUsuario, contrasena: contraseñaHasheada });

    // Guarda el usuario en la base de datos
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const lista = await usuarios.find();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await usuarios.findById(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const borrarPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await usuarios.findByIdAndDelete(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};



const modificarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const usuarioActualizado = await usuarios.findByIdAndUpdate(id, req.body, { new: true });
    if (usuarioActualizado) {
      res.json(usuarioActualizado);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export default {
  obtenerTodosLosUsuarios,
  obtenerPorId,
  borrarPorId,
  agregarUsuario,
  modificarUsuario,
};