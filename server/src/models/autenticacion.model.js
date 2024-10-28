import {model, Schema} from 'mongoose';

const acceso = new Schema({
    
    email: {
        type: String, 
        required: [true, 'El email es requerido'],
        unique: true,
        validate: {
            validator: function(value) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            },
            message: 'El email no es valido'
        }
    },
    contrasena:{
        type: String, 
        required: [true, 'La contraseña es requerida'],
        minlength: [8, 'La contraseña debe tener un minimo de 8 caracteres'],
        maxlength: 100
    }
});