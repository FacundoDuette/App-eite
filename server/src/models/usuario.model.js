import { model, Schema } from 'mongoose';


const usuario = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        minlength: [3, 'El nombre debe tener un minimo de 3 caracteres'],
        maxlength: 255
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido'],
        minlength: [3, 'El apellido debe tener un minimo de 3 caracteres'],
        maxlength: 255
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true,
        validate: {
            validator: function (value) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            },
            message: 'El email no es valido'
        }
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        minlength: [8, 'La contraseña debe tener un minimo de 8 caracteres'],
        maxlength: 100
    },
    fechaDeNacimiento: {
        type: Date,
        required: [false, 'La fecha de nacimiento es requerida'],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: 'La fecha de nacimiento no es valida'
        }
    },
    foto: {
        type: String,
        required: [false, 'La foto es requerida'],
        validate: {
            validator: function (value) {
                const regex = /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
                return regex.test(value);
            },
            message: 'La foto no es valida'
        }
    },
    contacto: {
        type: String,
        required: [false, 'El contacto es requerido'],
        validate: {
            validator: function (value) {
                const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/;
                return regex.test(value);
            },
            message: 'El contacto no es valido'
        }
    },
    visitas: {
        type: Number,
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: 'Las visitas no son validas'
        }
    }
}, { timestamps: true });

const usuarios = model('Usuarios', usuario);
export default usuarios;