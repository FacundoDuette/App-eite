import { useContext, useState } from "react";
import userContext from "../components/userContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
    const { user, setUser, cargado } = useContext(userContext.userContext);

    const [redireccion, setRedireccion] = useState(null)

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }

    const logOut = async () => {
        await axios.delete('/api/session/logout')
        setRedireccion('/')
        setUser(null)
    }

    if (!cargado) {
        return <p>Cargando...</p>
    }

    if (cargado && !user && !redireccion) {
        return <Navigate to={'/login'} />
    }

    const linkClasses = (type = null) => {
        let classes = 'py-2 px-6'
        if (type === subpage/*  || (subpage === undefined && type === 'profile') */) {
            classes += ' bg-primary text-white rounded-full'
        }
        return classes
    }

    if (redireccion) {
        return <Navigate to={redireccion} />
    }
    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-12">
                <Link className={linkClasses('profile')} to={'/account'}>Mi cuenta</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>Mis Alojamientos</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>Mis Reservas</Link>
                {/* <Link className="py-2 px-6" to={'/logout'}>Logout</Link> */}
            </nav>
            {/* <h1>{user.nombre} {user.apellido}</h1>
            <p>{user.email}</p> */}
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    <h3>Estás logeado como {user.nombre} {user.apellido}</h3>
                    <p>{user.email}</p>
                    <button onClick={logOut} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </div>
    )
}

export default AccountPage;