import React, { useContext } from 'react';
import userContext from './userContext';
import { useNavigate } from 'react-router-dom';

const CardAlojamiento = ({ _id, usuarioId, fotos, direccion, descripcion, cantidadHuespedes, precioPorNoche, servicios }) => {
  // const { _id, usuarioId, fotos, direccion, descripcion, cantidadHuespedes, precioPorNoche, servicios } = alojamiento;

  const { user } = useContext(userContext.userContext);


  const navegar = useNavigate();

  return (
    <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={fotos[0]} alt="Alojamiento" className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Dir: {direccion}</span>
          <span className="text-sm text-gray-500">Cap: {cantidadHuespedes}</span>
        </div>
        <p className="text-gray-500 text-sm">Des: {descripcion}</p>
        {/* <p className="text-gray-500 text-sm">Servicios: {servicios}</p> */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-semibold">Servicios:</span>
          <div className="flex flex-wrap">
            {servicios.wifi && <span className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Wifi</span>}
            {servicios.smartTV && <span className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">SmartTV</span>}
            {servicios.mascotas && <span className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Mascotas</span>}
            {servicios.estacionamiento && <span className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Estacionamiento</span>}
            {servicios.parlante && <span className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Parlante</span>}
            {servicios.entradaPrivada && <span className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Entrada Privada</span>}
          </div>
        </div>
        <p className="text-lg font-semibold mt-2">${precioPorNoche} /noche</p>
        {usuarioId === (user?._id) ? <button onClick={() => navegar(`/account/places/edit/${_id}`)}>Editar</button> : <button onClick={() => navegar(`/place/${_id}`)}>Ver detalles</button>}
      </div>
    </div>
  )
}

export default CardAlojamiento;