import { model, Schema } from 'mongoose';

const alojamiento = new Schema({
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
    precio: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: 0
    },
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