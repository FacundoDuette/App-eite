import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';


const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        minlength: [3, 'El nombre debe tener un minimo de 3 caracteres'],
        maxlength: 255
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido'],
        minlength: [3, 'El apellido debe tener un minimo de 3 caracteres'],
        maxlength: 255
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: [true, 'El email ya existe'],
        validate: {
            validator: function (value) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            },
            message: 'El email no es valido'
        }
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        minlength: [8, 'La contraseña debe tener un minimo de 8 caracteres'],
        maxlength: 100
    },
    fechaDeNacimiento: {
        type: Date,
        required: [false, 'La fecha de nacimiento es requerida'],
        validate: {
            validator: function (value) {
                return value < new Date();
            },
            message: 'La fecha de nacimiento no es valida'
        }
    },
    // foto: {
    //     type: String,
    // },
    contacto: {
        type: String,
        required: [false, 'El contacto es requerido'],
        validate: {
            validator: function (value) {
                const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/;
                return regex.test(value);
            },
            message: 'El contacto no es valido'
        }
    }
}, { timestamps: true });



//VALIDACIONES DE CONTRASEÑA Y CONFIRMACIÓN DE CONTRASEÑA
usuarioSchema.virtual('confirmContrasena')
    .get(function () {
        return this._confirmPassword;
    })
    .set(function (value) {
        this._confirmContrasena = value;
    });


usuarioSchema.pre('validate', function (next) {
    if (this.contrasena !== this.confirmContrasena) {
        this.invalidate('confirmContrasena', '¡Las contraseñas no coinciden!');
    }
    next();
});

//ENCRYPTACIÓN DE CONTRASEÑA
usuarioSchema.pre('save', function (next) {
    //Si la contraseña es modificada, la encriptamos
    if (this.isModified('contrasena')) {
        try {
            const salt = bcrypt.genSaltSync(10);    //Genera un salt para encriptar la contraseña
            const hash = bcrypt.hashSync(this.contrasena, salt); //Encripta la contraseña
            this.contrasena = hash;   //Asigna la contraseña encriptada al campo password
            next(); //Continua con el proceso
        } catch (error) {
            next(error);    //Si hay un error, lo enviamos al siguiente middleware
        }
    }
    else {
        next(); //Si no hay cambios en la contraseña, continuamos con el proceso
    }
});

const usuarios = model('Usuarios', usuarioSchema);
export default usuarios;