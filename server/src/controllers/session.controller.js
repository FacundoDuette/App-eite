import usuario from "../models/usuario.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// dotenv.config();

const login = async (req, res) => {
    const { email, contrasena } = req.body;
    const user = await usuario.findOne({ email });

    try {
        if (!user) {            //Se verifica la existencia de un usario a traves de su correo
            return res.status(404).json({
                errors: {
                    email: {
                        message: "Usuario no encontrado"
                    }
                }
            });
        }

        const contrasenaValida = await bcrypt.compare(contrasena, user.contrasena);      //Se compara la contraseña ingresada con la contraseña guardada del usuario

        if (!contrasenaValida) {        //si devielve true (válido) se omite el if, si devuelve false (inválido) se ejecuta el if y devuelve un mensaje hacia el front.
            return res.status(401).json({
                errors: {
                    contrasena: {
                        message: "Contraseña inválida"
                    }
                }
            });
        }

        //Una vez validado la existencia y datos correctos, generamos el token para el user
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        //Devolvemos un cambio de estado exitoso y enviamos la info al User
        res.status(200).cookie('userToken', token, { httpOnly: true }).json({ user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errors: {
                message: "Error al iniciar sesión"
            }
        });
    }
}


const logout = async (req, res) => {
    res.status(200).clearCookie('userToken').json({ message: "Sesión cerrada" });
}

//Obtener info del usuario logueado
const session = async (req, res) => {
    const { userToken } = req.cookies;
    if (userToken) {
        jwt.verify(userToken, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: "Token inválido" });
            }
            req.user = decoded;
            res.status(200).json(req.user);
        })
    }
}

export default {
    login,
    logout,
    session
}