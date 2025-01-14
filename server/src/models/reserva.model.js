import { model, Schema } from 'mongoose';
import usuario from './usuario.model.js';
import alojamiento from './alojamiento.model.js';

const ReservasSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,       //En este campo se cargará el id único del usuario
        ref: usuario,
        // type: String,       //En este campo se cargará el correo único del usuario
        required: [true, 'El Usuario es requerido']
    },
    alojamiento: {
        type: Schema.Types.ObjectId,       //En este campo se cargará el id único del alojamiento
        ref: alojamiento,
        // type: String,    //En este campo se cargará el id único del alojamiento
        required: [true, 'El id del alojamiento es requerido']
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio es requerida'],
        // validate: {
        //     validator: function (value) {
        //         return value >= new Date();
        //     },
        //     message: 'La fecha de inicio debe ser mayor o igual a la fecha actual'
        // }
    },
    fechaFin: {
        type: Date,
        required: [true, 'La fecha de fin es requerida'],
        // validate: {
        //     validator: function (value) {
        //         return value >= new Date();
        //     },
        //     message: 'La fecha de inicio debe ser mayor o igual a la fecha actual'
        // }
    },
    cantidadHuespedes: {
        type: Number,
        required: [true, 'La cantidad de huespedes es requerida']
    },
    notas: {
        type: String,
        // required: [true, 'Las notas son requeridas'],
        default: 'No hay notas'
    },
    precio: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Reserva = model('Reserva', ReservasSchema);

export default Reserva;