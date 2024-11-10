import { model, Schema } from 'mongoose';

const reservaSchema = Schema({
  place: {type:Schema.Types.ObjectId, required:true, ref:'Alojamiento'},
  user: {type:Schema.Types.ObjectId, required:true, ref:'Usuarios'},
  checkIn: {type:Date, required:true},
  checkOut: {type:Date, required:true},
  name: {type:String, required:true},
  phone: {type:String, required:true},
  price: Number,
});

const reservaModel = model('Reserva', reservaSchema);
export default reservaModel;