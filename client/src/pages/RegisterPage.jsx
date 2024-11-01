import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    // const [form, setForm] = useState({})
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const respuesta = await axios.post('/api/usuario', {
            nombre,
            apellido,
            email,
            contrasena
        });
        console.log(respuesta.data);
    }


    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">

                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form onSubmit={handleRegister} className="max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Escriba su nombre..."
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Escriba su apellido..."
                        value={apellido}
                        onChange={e => setApellido(e.target.value)}
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
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                    />
                    <button type="Submit" className="primary" >Register</button>
                </form>
                <div className="text-center text-gray-500 py-2">
                    Ya eres miembro? <Link className="underline text-black" to={'/login'}>Iniciar sesión</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;