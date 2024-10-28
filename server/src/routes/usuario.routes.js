import express from 'express';
import ControladorUsuario from '../controllers/usuario.controller.js';

const rutasUsuario = express.Router();

rutasUsuario.get('/', ControladorUsuario.obtenerTodosLosUsuarios);
rutasUsuario.get('/:id',ControladorUsuario.obtenerPorId);
rutasUsuario.delete('/:id',ControladorUsuario.borrarPorId);
rutasUsuario.patch('/:id',ControladorUsuario.modificarUsuario);
rutasUsuario.post('/',ControladorUsuario.agregarUsuario);

export default rutasUsuario;