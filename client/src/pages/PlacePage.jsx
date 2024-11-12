import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import userContext from "../components/userContext";


const PlacePage = () => {

    const { user } = useContext(userContext.userContext)

    const { id } = useParams();
    const [alojamiento, setAlojamiento] = useState(null);

    const navegar = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/alojamiento/${id}`).then(response => {
            setAlojamiento(response.data);
        });
    }, [id]);

    if (!alojamiento) return '';

    const handleReserva = async () => {
        try {
            if (!user) {
                // Redirigir al usuario a la página de inicio de sesión
                return navegar('/login');
            }
            // Redireccionar a la reserva
            return navegar(`/account/bookings/new/${id}`)

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{alojamiento.titulo}</h1>
            <a className="my-2 block font-semibold underline" target="_blank" /* href={'https://maps.google.com/?q='+alojamiento.direccion} */>{alojamiento.direccion}</a>
            <div className="grid gap-2 grid-cols-[2fr_1fr]">
                <div>
                    {alojamiento.photos?.[0] && (
                        <div>
                            <img className="aspect-square object-cover" src={/* 'http://localhost:8080/uploads' + */ alojamiento.fotos[0]} alt="" />
                        </div>
                    )}
                </div>
                <div className="grid">
                    {alojamiento.photos?.[1] && (
                        <img className="aspect-square object-cover" src={/* 'http://localhost:8080/uploads' + */ alojamiento.fotos[1]} alt="" />
                    )}
                </div>
                <div className="border borde">
                    {alojamiento.photos?.[2] && (
                        <img className="aspect-square object-cover relative top-2" src={/* 'http://localhost:8080/uploads' + */ alojamiento.fotos[2]} alt="" />
                    )}
                </div>
            </div>
            <p>Descripción: {alojamiento.descripcion}</p>
            <div className="grid gap-2 grid-cols-[2fr_1fr]">
                <p>Servicios:</p>
                {alojamiento.servicios?.wifi && <p>Wifi</p>}
                {alojamiento.servicios?.smartTV && <p>smartTV</p>}
                {alojamiento.servicios?.mascotas && <p>mascotas</p>}
                {alojamiento.servicios?.estacionamiento && <p>estacionamiento</p>}
                {alojamiento.servicios?.parlante && <p>parlante</p>}
                {alojamiento.servicios?.entradaPrivada && <p>entradaPrivada</p>}
            </div>
            <p>Cantidad de huespedes: {alojamiento.cantidadHuespedes}</p>
            <p>Notas: {alojamiento.informacionExtra}</p>
            <p>Precio por noche: {alojamiento.precioPorNoche}$</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleReserva(id)}>Reservar</button>
        </div>
    )
}

export default PlacePage