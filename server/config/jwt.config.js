import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    /* const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
    }) */
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
            return res.status(403).json({
                errors: {
                    auth: {
                        message: "No autorizado"
                    }
                }
            })

        //devolvemos los datos del usuario que se encuentra en el token
        req.user = payload;


        //Una vez que ya se haya verificado y comprobado la existencia sin errores se continua a la siguiente página con el .next()
        next();
    })
}

export default authenticate;