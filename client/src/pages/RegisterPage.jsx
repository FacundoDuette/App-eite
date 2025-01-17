import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const RegisterPage = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmContrasena, setConfirmContrasena] = useState('');
    const [fechaDeNacimiento, setFechaDeNacimiento] = useState(dayjs().format('YYYY-MM-DD'));
    // const [foto, setFoto] = useState('');
    const [contacto, setContacto] = useState('');

    const [errores, setErrores] = useState([]);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        // console.log(nombre, apellido, email, contrasena, fechaDeNacimiento, foto, contacto);
        // Enviar los datos con la estructura `data` dentro del objeto
        try {
            const respuesta = await axios.post('/api/usuario', {
                datosUsuario: {
                    nombre,
                    apellido,
                    email,
                    fechaDeNacimiento,
                    // foto,
                    contacto,
                    contrasena,
                    confirmContrasena
                }
            });
            navigate('/login');
        } catch (error) {
            setErrores(error.response.data.error.errors)
        }
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
                    <p className="text-red-500 text-sm" hidden={errores?.nombre ? false : true}>{errores?.nombre?.message}</p>
                    <input
                        type="text"
                        placeholder="Escriba su apellido..."
                        value={apellido}
                        onChange={e => setApellido(e.target.value)}
                    />
                    <p className="text-red-500 text-sm" hidden={errores?.apellido ? false : true}>{errores?.apellido?.message}</p>
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
                    <input
                        type="password"
                        placeholder="Escriba su confirmación de contraseña..."
                        value={confirmContrasena}
                        onChange={e => setConfirmContrasena(e.target.value)}
                    />
                    <p className="text-red-500 text-sm" hidden={errores?.confirmContrasena ? false : true}>{errores?.confirmContrasena?.message}</p>
                    <input
                        type="date"
                        // placeholder="Fecha de nacimiento"
                        value={dayjs(fechaDeNacimiento).format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD')}
                        onChange={e => setFechaDeNacimiento(dayjs(e.target.value).format('YYYY-MM-DD'))}
                    />
                    <p className="text-red-500 text-sm" hidden={errores?.fechaDeNacimiento ? false : true}>{errores?.fechaDeNacimiento?.message}</p>
                    {/* <input
                        type="text"
                        placeholder="Enlace a la foto de perfil..."
                        value={foto}
                        onChange={e => setFoto(e.target.value)}
                    /> */}
                    {/* <p className="text-red-500 text-sm" hidden={errores?.foto ? false : true}>{errores?.foto?.message}</p> */}
                    <input
                        type="text"
                        placeholder="Número de contacto..."
                        value={contacto}
                        onChange={e => setContacto(e.target.value)}
                    />
                    <p className="text-red-500 text-sm" hidden={errores?.contacto ? false : true}>{errores?.contacto?.message}</p>
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