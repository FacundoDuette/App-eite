import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import userContext from "../components/userContext";

const PlacePage = () => {
    const { user } = useContext(userContext.userContext);
    const { id } = useParams();
    const [alojamiento, setAlojamiento] = useState(null);
    const navegar = useNavigate();

    useEffect(() => {
        if (!id) return;
        axios.get(`/api/alojamiento/${id}`).then(response => setAlojamiento(response.data));
    }, [id]);

    if (!alojamiento) return '';

    const handleReserva = () => {
        if (!user) return navegar('/login');
        return navegar(`/account/bookings/new/${id}`);
    }

    return (
        <div className="bg-gray-100 py-8 px-4 sm:px-8">
            {/* Título y Ubicación */}
            <h1 className="text-3xl font-semibold mb-2">{alojamiento.titulo}</h1>
            <a 
                className="text-blue-600 underline hover:text-blue-800"
                href={`https://maps.google.com/?q=${alojamiento.direccion}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {alojamiento.direccion}
            </a>

            {/* Galería de fotos */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {alojamiento.fotos?.map((foto, index) => (
                    <div key={index} className="h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                        <img src={foto} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Información del alojamiento */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    {/* Descripción */}
                    <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                    <p className="text-gray-700 leading-relaxed">{alojamiento.descripcion}</p>

                    {/* Servicios */}
                    <h2 className="text-2xl font-semibold mt-6 mb-4">Servicios</h2>
                    <ul className="grid grid-cols-2 gap-2 text-gray-700">
                        {alojamiento.servicios?.wifi && <li>✅ Wifi</li>}
                        {alojamiento.servicios?.smartTV && <li>✅ SmartTV</li>}
                        {alojamiento.servicios?.mascotas && <li>✅ Mascotas</li>}
                        {alojamiento.servicios?.estacionamiento && <li>✅ Estacionamiento</li>}
                        {alojamiento.servicios?.parlante && <li>✅ Parlante</li>}
                        {alojamiento.servicios?.entradaPrivada && <li>✅ Entrada Privada</li>}
                    </ul>

                    {/* Información adicional */}
                    <h2 className="text-2xl font-semibold mt-6 mb-4">Información adicional</h2>
                    <p className="text-gray-700">{alojamiento.informacionExtra}</p>
                </div>

                {/* Sección de reserva */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-baseline space-x-1 mb-4">
                        <span className="text-3xl font-bold">${alojamiento.precioPorNoche}</span>
                        <span className="text-lg text-gray-600">/ noche</span>
                    </div>
                    <div className="text-gray-700 mb-4">
                        <p><strong>Capacidad:</strong> {alojamiento.cantidadHuespedes} huéspedes</p>
                    </div>
                    <button 
                        onClick={handleReserva} 
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg text-lg mt-4 transition-colors"
                    >
                        Reservar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlacePage;