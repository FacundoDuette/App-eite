import { Link, useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import userContext from "../components/userContext";
import BookingPage from "../components/BookingPage";

const ReservationsPage = () => {
    const { user } = useContext(userContext.userContext);
    const navegar = useNavigate(); 
    const { action } = useParams();
    const [reservas, setReservas] = useState([]);
    const [cargado, setCargado] = useState(false);

    const cargarReservas = async () => {
        try {
            const response = await axios.get(`/api/reserva/user/${user._id}`);
            setReservas(response.data.listaReservas);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if ((action !== 'new' && action !== 'edit' && !cargado)) {
            cargarReservas();
            setCargado(true);
        }
    }, [action, cargado]);

    const calcularTotalEstadia = (fechaInicio, fechaFin, precio) => {
        const dias = dayjs(fechaFin).diff(dayjs(fechaInicio), "day");
        return dias * precio;
    };

    const handleEditClick = (reservaId) => {
        setCargado(false)
        navegar(`/account/bookings/edit/${reservaId}`);
    };

    return (
        <div className="p-8">
            {(action !== 'new' && action !== 'edit') && (
                <div className="text-center mb-8">
                    <Link
                        className="inline-flex gap-1 bg-blue-600 text-white py-2 px-6 rounded-full"
                        to={'/'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Hacer una reserva
                    </Link>
                </div>
            )}
            {((action !== 'new' && action !== 'edit') && (reservas.length !== 0)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reservas.map((reserva, index) => {
                        const totalEstadia = calcularTotalEstadia(reserva.fechaInicio, reserva.fechaFin, reserva.precio);
                        return (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
                                <div>
                                <h3 className="text-2xl font-semibold mb-1">
                                        {reserva.alojamiento ? reserva.alojamiento.titulo : "Alojamiento no disponible"}
                                    </h3>
                                    <p className="text-gray-500 mb-4">
                                        {reserva.alojamiento ? reserva.alojamiento.direccion : "Dirección no disponible"}
                                    </p>
                                    <h4 className="text-lg font-semibold mb-2">
                                        {dayjs(reserva.fechaInicio).format('DD/MM/YYYY')} - {dayjs(reserva.fechaFin).format('DD/MM/YYYY')}
                                    </h4>
                                    <p className="text-gray-700 mb-4">
                                        Huéspedes: {reserva.cantidadHuespedes} de {reserva.alojamiento ? reserva.alojamiento.cantidadHuespedes : "N/A"}
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        Precio por noche: ${reserva.precio}
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        Total de la estadía: <span className="font-semibold">${totalEstadia}</span>
                                    </p>
                                </div>
                                <p className="text-gray-600 mt-4">{reserva.notas || "Sin notas adicionales"}</p>
                                {/* Botón de Editar */}
                                <button
                                    className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
                                    onClick={() => handleEditClick(reserva._id)}
                                >
                                    Editar
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
            {action === 'new' && <BookingPage />}
            {action === 'edit' && <BookingPage />}
        </div>
    );
};

export default ReservationsPage;