import { useContext, useState } from "react";
import userContext from "../components/userContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
// import ReservationsForm from "./ReservationsForm";
import ReservationsPage from "./ReservationsPage";
import dayjs from "dayjs";
// import Reservations from "./Reservations"

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
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full'
        if (type === subpage/*  || (subpage === undefined && type === 'profile') */) {
            classes += ' bg-primary text-white rounded-full'
        } else {
            classes += ' bg-gray-200'
        }
        return classes
    }

    if (redireccion) {
        return <Navigate to={redireccion} />
    }

    // Obtener iniciales del nombre y apellido
    const getInitials = () => {
        if (user?.nombre && user?.apellido) {
            return `${user.nombre[0]}${user.apellido[0]}`.toUpperCase();
        }
        return '';
    };

    return (
        <div>
            <nav className="w-full flex justify-center mt-4 gap-2 mb-12">
                <Link className={linkClasses('profile')} to={'/account'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 flex">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Mi cuenta
                </Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    Mis Reservas
                </Link>
                <Link className={linkClasses('places')} to={'/account/places'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>
                    Mis Alojamientos
                </Link>
                {/* <Link className="py-2 px-6" to={'/logout'}>Logout</Link> */}
            </nav>
            {/* <h1>{user.nombre} {user.apellido}</h1>
            <p>{user.email}</p> */}
            {subpage === 'profile' && (
                <div className="text-center max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
                    {/* Iniciales en lugar de la foto de perfil */}
                    <div className="w-32 h-32 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
                        {getInitials()}
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">{user.nombre} {user.apellido}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex flex-col items-center mt-4 space-y-2">
                        <p className="text-gray-700 font-medium">Teléfono:</p>
                        <p className="text-gray-600">{user.contacto}</p>
                        <p className="text-gray-700 font-medium">Fecha de nacimiento:</p>
                        <p className="text-gray-600">{dayjs(user.fechaDeNacimiento).format('DD/MM/YYYY')}</p>
                    </div>
                    <button
                        onClick={logOut}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg mt-6 transition-colors duration-300"
                    >
                        Logout
                    </button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
            {subpage === 'places/new' && (
                <PlacesPage />
            )}
            {subpage === 'places/edit' && (
                <PlacesPage />
            )}
            {subpage === 'bookings' && (
                <ReservationsPage />
            )}
            {subpage === 'bookings/new' && (
                <ReservationsPage />
            )}
            {subpage === 'bookings/edit' && (
                <ReservationsPage />
            )}
        </div>
    )
}

export default AccountPage;