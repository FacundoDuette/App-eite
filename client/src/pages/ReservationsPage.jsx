import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import userContext from "../components/userContext";
import BookingPage from "../components/BookingPage";
import CardReserva from "../components/CardReserva";

const ReservationsPage = () => {
    const { user } = useContext(userContext.userContext);
    //const navigate = useNavigate();
    const { action } = useParams();
    const [reservas, setReservas] = useState([]);
    const [cargado, setCargado] = useState(false);
    const [error,setError] = useState('')

    const cargarReservas = async () => {
        try {
            const response = await axios.get(`/api/reserva/user/${user._id}`);
            setReservas(response.data.listaReservas);
            setCargado(true);
        } catch (error) {
            setError(error.response.data.message)
        }
    };

    useEffect(() => {
        if ((action !== 'new' && action !== 'edit' && !cargado)) {
            cargarReservas();
        }
    }, [action, cargado]);

    return (
        <div className="px-6 py-4">
            {action !== 'new' && action !== 'edit' && (
                <div className="text-center mb-6">
                    <Link
                        className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                        to={'/'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Hacer una reserva
                    </Link>
                </div>
            )}
            {reservas.length > 0 && (action!== 'edit') && (action !== 'new') ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reservas.map((reserva) => (
                        <CardReserva
                            key={reserva._id}
                            reserva={reserva}
                        />
                    ))}
                </div>
            ) : (
                <h3 className="text-center text-gray-500">{error}</h3>
            )}
            {action === 'new' && <BookingPage />}
            {action === 'edit' && <BookingPage />}
        </div>
    );
};

export default ReservationsPage;