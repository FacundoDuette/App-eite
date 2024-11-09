import { model, Schema } from 'mongoose';

const alojamientoSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios', 
        required: [true, 'El usuario es requerido']
    },
    titulo: {
        type: String,
        required: [true, 'El título es requerido'],
        minlength: [3, 'El título debe tener un mínimo de 3 caracteres'],
        maxlength: 255
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es requerida'],
        minlength: [10, 'La dirección debe tener un mínimo de 10 caracteres'],
        maxlength: 255
    },
    fotos: [{
        type: String,
        required: [true, 'Al menos una foto es requerida'],
        validate: [v => Array.isArray(v) && v.length > 0, 'Debe incluir al menos una foto']
    }],
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
        minlength: [10, 'La descripción debe tener un mínimo de 10 caracteres'],
        maxlength: 1000
    },
    servicios: {
        wifi: { type: Boolean, default: false },
        smartTV: { type: Boolean, default: false },
        mascotas: { type: Boolean, default: false },
        estacionamiento: { type: Boolean, default: false },
        parlante: { type: Boolean, default: false },
        entradaPrivada: { type: Boolean, default: false }
    },
    informacionExtra: {
        type: String,
        maxlength: 500,
        default: ''
    },
    horarios: {
        checkIn: {
            type: String,
            validate: {
                validator: function(v) {
                    return /^\d{2}:\d{2}$/.test(v);
                },
                message: props => `${props.value} no es un formato de hora válido`
            },
            default: "14:00"
        },
        checkOut: {
            type: String,
            validate: {
                validator: function(v) {
                    return /^\d{2}:\d{2}$/.test(v);
                },
                message: props => `${props.value} no es un formato de hora válido`
            },
            default: "11:00"
        }
    },
    cantidadHuespedes: {
        type: Number,
        required: [true, 'La cantidad de huéspedes es requerida'],
        min: 1,
        max: 20
    },
    precioPorNoche: {
        type: Number,
        required: [true, 'El precio por noche es requerido'],
        min: 0
    },
    detalles: {
        cantidadHabitaciones: {
            type: Number,
            required: [true, 'La cantidad de habitaciones es requerida'],
            min: 1
        },
        cantidadCamas: {
            type: Number,
            required: [true, 'La cantidad de camas es requerida'],
            min: 1
        },
        capacidadMaxima: {
            type: Number,
            required: [true, 'La capacidad de personas es requerida'],
            min: 1
        }
    }
}, { timestamps: true });

const Alojamientos = model('Alojamientos', alojamientoSchema);
export default Alojamientos;