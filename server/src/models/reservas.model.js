import { model, Schema } from 'mongoose';
import usuario from './usuario.model';
import alojamiento from './alojamiento.model.js';

const ReservasSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    alojamiento: { type: Schema.Types.ObjectId, ref: 'Alojamiento' },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    cantidadHuespedes: { type: Number, required: true },
    precio: { type: Number, required: true },
})

const Reserva = model('Reserva', ReservasSchema);

export default Reserva;