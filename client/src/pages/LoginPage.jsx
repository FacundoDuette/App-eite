import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useContext, useState } from "react";
import userContext from "../components/userContext";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();
    const [errores, setErrores] = useState([])

    const { setUser } = useContext(userContext.userContext)

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/session/login', { email, contrasena });
            const data = response.data.user;
            // console.log(data);
            const setter = setUser(data)
            await Promise.resolve(setter).then(() => {
                navigate('/')
            });
        } catch (error) {
            setErrores(error.response.data.errors)
            console.error(error);
            console.error(error.response.data.errors);
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">

                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form onSubmit={handleLogin} className="max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Escriba su correo..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <p className="text-red-500 text-sm" hidden={errores?.email ? false : true}>{errores?.email?.message}</p>
                    <input
                        type="password"
                        placeholder="Escriba su contraseña..."
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                    />
                    <p className="text-red-500 text-sm" hidden={errores?.contrasena ? false : true}>{errores?.contrasena?.message}</p>
                    <button type="Submit" className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Aún no estás registrado? <Link className="underline text-black"
                            to={'/register'}>Regístrate</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage