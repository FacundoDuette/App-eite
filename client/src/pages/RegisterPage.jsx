import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [fechaDeNacimiento, setFechaDeNacimiento] = useState('');
    const [foto, setFoto] = useState('');
    const [contacto, setContacto] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(nombre, apellido, email, contrasena, fechaDeNacimiento, foto, contacto);
        // Enviar los datos con la estructura `data` dentro del objeto
        const respuesta = await axios.post('/api/usuario', {
            data: {
                datosUsuario: {
                    nombre,
                    apellido,
                    email,
                    fechaDeNacimiento,
                    foto,
                    contacto
                },
                contrasena
            }
        });
        console.log(respuesta.data);
        navigate('/login');
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
                    <input
                        type="date"
                        placeholder="Fecha de nacimiento"
                        value={fechaDeNacimiento}
                        onChange={e => setFechaDeNacimiento(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enlace a la foto de perfil..."
                        value={foto}
                        onChange={e => setFoto(e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="Número de contacto..."
                        value={contacto}
                        onChange={e => setContacto(e.target.value)}
                    />
                    <button type="submit" className="primary mt-4">Register</button>
                    <div className="text-center text-gray-500 py-2">
                        Ya eres miembro? <Link className="underline text-black" to={'/login'}>Iniciar sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;