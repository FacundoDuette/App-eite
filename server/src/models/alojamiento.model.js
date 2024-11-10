import { model, Schema } from 'mongoose';

const placeSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Usuarios',},
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

const PlaceModel = model('Place', placeSchema);

export default PlaceModel;