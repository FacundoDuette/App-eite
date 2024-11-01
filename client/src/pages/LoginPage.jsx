import { Link } from "react-router-dom"
import { useState } from "react";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, contrasena)
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
                    <input
                    type="password"
                    placeholder="Escriba su contraseña..."
                    value={contrasena}
                    onChange={e => setContrasena(e.target.value)}
                    />
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