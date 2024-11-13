import React, { useContext } from 'react';
import userContext from './userContext';
import { useNavigate } from 'react-router-dom';

const CardAlojamiento = ({ _id, usuarioId, fotos, direccion, descripcion, cantidadHuespedes, precioPorNoche, servicios }) => {
    const { user } = useContext(userContext.userContext);
    const navegar = useNavigate();

    return (
        <div className="w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-2 flex-shrink-0">
            {/* Imagen del alojamiento */}
            <div className="relative">
                <img src={fotos[0]} alt="Alojamiento" className="w-full h-48 object-cover" />
            </div>

            {/* Contenido de la tarjeta */}
            <div className="p-4">
                {/* Dirección y capacidad */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-800 truncate">{direccion}</span>
                    <span className="text-xs text-gray-500">Cap: {cantidadHuespedes}</span>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 text-sm truncate mb-2">Des: {descripcion}</p>

                {/* Servicios */}
                <div className="flex flex-wrap gap-1 mt-2">
                    {servicios.wifi && <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">Wifi</span>}
                    {servicios.smartTV && <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">SmartTV</span>}
                    {servicios.mascotas && <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">Mascotas</span>}
                    {servicios.estacionamiento && <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">Estacionamiento</span>}
                    {servicios.parlante && <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">Parlante</span>}
                    {servicios.entradaPrivada && <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">Entrada Privada</span>}
                </div>

                {/* Precio y botón */}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-semibold text-gray-800">${precioPorNoche} / noche</p>
                    {usuarioId === (user?._id) ? (
                        <button
                            onClick={() => navegar(`/account/places/edit/${_id}`)}
                            className="text-blue-500 text-sm hover:underline"
                        >
                            Editar
                        </button>
                    ) : (
                        <button
                            onClick={() => navegar(`account/bookings/new/${_id}`)}
                            className="text-blue-500 text-sm hover:underline"
                        >
                            Ver detalles
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardAlojamiento;