import React, { useContext } from "react";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";

const CardAlojamiento = ({
  _id,
  usuarioId,
  fotos,
  direccion,
  descripcion,
  cantidadHuespedes,
  precioPorNoche,
  servicios,
}) => {
  const { user } = useContext(userContext.userContext);
  const navegar = useNavigate();

  const manejarClick = () => {
    if (usuarioId === user?._id) {
      navegar(`/account/places/edit/${_id}`);
    } else {
      navegar(`account/bookings/new/${_id}`);
    }
  };

  return (
    <div
      onClick={manejarClick}
      className="w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 mx-2 cursor-pointer flex flex-col justify-between"
    >
      {/* Imagen del alojamiento */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={fotos[0]}
          alt="Alojamiento"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        {/* Dirección y capacidad */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-gray-800 truncate">
              {direccion}
            </span>

            {/* Ícono SVG y cantidad de huéspedes */}
            <div className="flex items-center space-x-1 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span className="text-sm">{cantidadHuespedes}</span>
            </div>
          </div>

          {/* Descripción */}
          <p className="text-gray-600 text-sm truncate mb-3">{descripcion}</p>

          {/* Servicios */}
          <div className="flex flex-wrap gap-1 mt-2">
            {servicios.wifi && (
              <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-lg">
                Wifi
              </span>
            )}
            {servicios.smartTV && (
              <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-lg">
                SmartTV
              </span>
            )}
            {servicios.mascotas && (
              <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-lg">
                Mascotas
              </span>
            )}
            {servicios.estacionamiento && (
              <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-lg">
                Estacionamiento
              </span>
            )}
            {servicios.parlante && (
              <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-lg">
                Parlante
              </span>
            )}
            {servicios.entradaPrivada && (
              <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-lg">
                Entrada Privada
              </span>
            )}
          </div>
        </div>

        {/* Precio y acción */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-xl font-semibold text-gray-800">
            ${precioPorNoche} <span className="text-sm text-gray-500">/ noche</span>
          </p>
          <span className="text-blue-600 text-sm font-medium hover:underline">
            {usuarioId === user?._id ? "Editar" : "Ver disponibilidad"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardAlojamiento;