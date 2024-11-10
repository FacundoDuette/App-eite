import { model, Schema } from 'mongoose';

const reservaSchema = Schema({
  place: {
    type: Schema.Types.ObjectId,
    required: [true, "El campo alojamiento es requerido"],
    ref: 'Alojamiento'
  },

  user: {
    type: Schema.Types.ObjectId,
    required: [true, "El campo usuario es requerido"],
    ref: 'Usuarios'
  },

  checkIn: {
    type: Date,
    required: [true, "El campo checkIn es requerido"]
  },

  checkOut: {
    type: Date,
    required: [true, "El campo checkOut es requerido"]
  },

  name: {
    type: String,
    required: [true, "El campo nombre es requerido"]
  },

  phone: {
    type: String,
    required: [true, "El campo telefono es requerido"]
  },

  price: {
    type: Number,
    required: [true, "El campo precio es requerido"]  //Recordar que el dato de precio se obtiene directamente del alojamiento, no se solicita nada de precio al user
  },

});

const reservaModel = model('Reserva', reservaSchema);
export default reservaModel;