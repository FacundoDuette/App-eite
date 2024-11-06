import express from 'express';
import ControladorUsuario from '../controllers/usuario.controller.js';
import authenticate from '../../config/jwt.config.js';

const rutasUsuario = express.Router();

rutasUsuario.get('/', authenticate, ControladorUsuario.obtenerTodosLosUsuarios);
rutasUsuario.get('/:id', ControladorUsuario.obtenerPorId);
rutasUsuario.delete('/:id', authenticate, ControladorUsuario.borrarPorId);
rutasUsuario.patch('/:id', authenticate, ControladorUsuario.modificarUsuario);
rutasUsuario.post('/', ControladorUsuario.agregarUsuario);

export default rutasUsuario;