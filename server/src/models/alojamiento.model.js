import { model, Schema } from 'mongoose';
/**
 * Script de prueba
 {
  "usuarioId": "671d805cebe38adf2f25b0fb",
  "tipoEspacio": "Apartamento 2 ",
  "tipoAlojamiento": "Entero",
  "detalles": {
    "cantidadHabitaciones": 2,
    "cantidadCamas": 3,
    "cantidadPersonas": 4
  },
  "direccion": "123 Calle Principal, Ciudad, País",
  "fotos": [
    "https://ejemplo.com/foto1.jpg",
    "https://ejemplo.com/foto2.jpg"
  ],
  "precio": 120
}
 */


const alojamiento = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',  // Nombre del modelo de referencia
        required: [true, 'El usuario es requerido'],
    },
    tipoEspacio: {
        type: String,
        required: [true, 'El tipo es requerido'],
        minlength: [3, 'El tipo debe tener un minimo de 3 caracteres'],
        maxlength: 255
    },
    tipoAlojamiento: {
        type: String,
        required: [true, 'El tipo de alojamiento es requerido'],
        minlength: [3, 'El tipo de alojamiento debe tener un minimo de 3 caracteres'],
        maxlength: 255
    },
    detalles: {
        cantidadHabitaciones: {
            type: Number,
            required: [true, 'La cantidad de habitaciones es requerida'],
            min: 1,
        },
        cantidadCamas: {
            type: Number,
            required: [true, 'La cantidad de camas es requerida'],
            min: 1,
        },
        cantidadPersonas: {
            type: Number,
            required: [true, 'La capacidad de personas es requerida'],
            min: 1,
        },
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es requerida'],
        minlength: [10, 'La dirección debe tener un minimo de 10 caracteres'],
        maxlength: 255
    },
    fotos: {
        type: [String],
        required: [true, 'Las fotos son requeridas'],
        minlength: 1
    },
    descripcion: {
        type: String,
        // required: [true, 'La descripción es requerida'],
        minlength: [10, 'La descripción debe tener un minimo de 10 caracteres'],
        maxlength: [255, 'la descripción debe tener un maximo de 255 caracteres']
    }
    // precio: {
    //     type: Number,
    //     required: [true, 'El precio es requerido'],
    //     min: 0
    // },
}, { timestamps: true });

const alojamientos = model('Alojamientos', alojamiento);
export default alojamientos;
/*
Tipos de Espacio:
- casa
- departamento
- granero
- barco
- cabaña
- casa rodante
- casa particular
- castillo
- casa griega
- contenedor
- hotel
- casa ecologica
- Mini casa
- Casa del árbol
Tipos de Alojamiento
-Alojamiento entero
-Una habitacion
-Habitacion compartida
*/
// Se podria agregar mas datos como servicios
//si estara alguien mas en el lugar ya sea atendiendo o conviviendo
//elementos de seguridad: botiquin, detectores de humo, extintores
// aspectos destacados como: muy solicitado, rustico, en la naturaleza, inolvidable, romantico o historico
// Descuentos por tipo: promocion por anuncio nuevo, descuento por estadia de 7 dias, descuento por estadia mensual