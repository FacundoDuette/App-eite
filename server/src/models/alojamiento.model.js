import { model, Schema } from 'mongoose';

const alojamientoSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: [true, "El alojamiento necesita un dueño"]
  },
  title: {
    type: String,
    required: [true, "El campo título es requerido"]
  },

  address: {
    type: String,
    required: [true, "El campo dirección es requerido"]
  },

  photos: {
    type: [String],
    required: [true, "El alojamiento necesita al menos una foto"]
  },

  description: {
    type: String,
    required: [true, "El campo descripción es requerido"]
  },

  perks: {
    type: [String],
    required: [true, "Es necesario especificar las caracteristicas que tenga el alojamiento (wifi, piscina, etc)"]
  },

  extraInfo: {
    type: String
  },

  checkIn: {
    type: Number
  },  //Caso el alojamiento tenga un horario de entrada especifico

  checkOut: {
    type: Number
  }, //Caso el alojamiento tenga un horario de salida especifico

  maxGuests: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: [true, "El alojamiento necesita un precio"]
  },

});

const AlojamientoModel = model('Alojamiento', alojamientoSchema);

export default AlojamientoModel;