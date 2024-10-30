import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">

                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form  className="max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Escriba su nombre..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Escriba su apellido..."
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Escriba su correo..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Escriba su contraseña..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="primary">Register</button>
                    <div className="text-center text-gray-500 py-2">
                        Ya eres miembro? <Link className="underline text-black" to={'/login'}>Iniciar sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}