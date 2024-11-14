import React from 'react';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const CardReserva = ({ reserva }) => {
    const navigate = useNavigate();

    const calcularTotalEstadia = (fechaInicio, fechaFin, precioPorNoche) => {
        const dias = dayjs(fechaFin).diff(dayjs(fechaInicio), "day");
        return dias * precioPorNoche;
    };

    const totalEstadia = calcularTotalEstadia(reserva.fechaInicio, reserva.fechaFin, reserva.precio);

    // Verificar si hay fotos, si no, usar una imagen de reserva por defecto
    const imagenAlojamiento = reserva.alojamiento.fotos && reserva.alojamiento.fotos.length > 0
        ? reserva.alojamiento.fotos[0]
        : "https://via.placeholder.com/150"; // URL de una imagen por defecto

    return (
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-2 w-full max-w-md">
            {/* Imagen del alojamiento */}
            <div className="w-1/3">
                <img src={imagenAlojamiento} alt="Alojamiento" className="w-full h-full object-cover rounded-l-lg" />
            </div>

            {/* Contenido de la tarjeta */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
                {/* Título y Dirección */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{reserva.alojamiento.titulo}</h3>
                    <p className="text-gray-500 text-sm truncate">{reserva.alojamiento.direccion}</p>

                    {/* Fechas de reserva */}
                    <p className="text-gray-600 text-xs mt-2">
                        Desde {dayjs(reserva.fechaInicio).format('DD/MM/YYYY')} - Hasta {dayjs(reserva.fechaFin).format('DD/MM/YYYY')}
                    </p>

                    {/* Capacidad */}
                    <p className="flex items-center text-gray-600 text-xs mt-1 size-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                        <span className='text-lg'>&nbsp;{reserva.cantidadHuespedes}</span>
                    </p>
                </div>

                {/* Precio y Total */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-700 text-sm font-semibold">Precio: ${reserva.precio}/noche</p>
                    <p className="text-gray-700 text-sm font-semibold">Total: <span className="text-indigo-600">${totalEstadia}</span></p>
                </div>

                {/* Botón de edición */}
                <div className="flex justify-end mt-4">
                <button
                    onClick={() => navigate(`/account/bookings/edit/${reserva._id}`)}
                    className="primary text-white py-1 px-3 rounded-lg transition-colors text-sm font-semibold"
                >
                        Ver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardReserva;