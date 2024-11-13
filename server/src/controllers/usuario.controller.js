import usuarios from "../models/usuario.model.js";
import bcrypt from 'bcrypt';

const encriptar = async (contrasena) => {
  // Hashea la contraseña
  const contraseñaHasheada = await bcrypt.hash(contrasena, 10);
  return contraseñaHasheada;
}

const agregarUsuario = async (req, res) => {
  try {
    //cambiamos la forma de acceder a los datos, sacamos los ... de datosUsuario y  le agregamos .data al final de req.body
    const { contrasena, confirmContrasena, datosUsuario } = req.body.data;

    //Verificamos si hay o no un usuario con el mismo email
    const usuarioExistente = await usuarios.findOne({ email: datosUsuario.email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    // Verifica que haya una contraseña
    if (!contrasena) {
      return res.status(400).json({ message: "La contraseña es requerida" });
    }

    if (contrasena !== confirmContrasena) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    //faltaba "await" para esperar a que se encripte la contrasena
    const encriptado = await encriptar(contrasena);
    const usuario = new usuarios({ ...datosUsuario, contrasena: encriptado });

    // Guarda el usuario en la base de datos
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const lista = await usuarios.find();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error });
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
    res.status(500).json({ error });
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
    res.status(500).json({ error });
  }
};



const modificarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const { contrasena } = req.body; // Extraigo la contraseña del objeto req.body

    const encriptado = await encriptar(contrasena);
    req.body.contrasena = encriptado;

    const usuarioActualizado = await usuarios.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (usuarioActualizado) {
      res.json(usuarioActualizado);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  obtenerTodosLosUsuarios,
  obtenerPorId,
  borrarPorId,
  agregarUsuario,
  modificarUsuario,
};