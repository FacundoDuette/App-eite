import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.userToken;

        if (token == null) return res.status(401).json({
            errors: {
                auth: {
                    message: "No autorizado"
                }
            }
        });

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) //Verificamos si extiste algun error en el proceso de chequeo
                return res.status(401).json({
                    errors: {
                        auth: {
                            message: "No permitido"
                        }
                    }
                })

            //devolvemos los datos del usuario que se encuentra en el token
            req.user = payload;


            //Una vez que ya se haya verificado y comprobado la existencia sin errores se continua a la siguiente página con el .next()
            next();
        })

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            errors: {
                auth: {
                    message: "Fué redireccionado a Login"
                }
            }
        })
    }
}

export default authenticate;