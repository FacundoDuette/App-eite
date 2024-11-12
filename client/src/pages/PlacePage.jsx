import axios from "axios";
import { useState, useEffect, useContext } from "react";
import userContext from "../components/userContext";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useNavigate, useParams } from "react-router-dom";
dayjs.extend(isBetween);

const PlacePage = () => {
    const { user } = useContext(userContext.userContext);
    const navegar = useNavigate();
    const { id } = useParams();

    const [alojamiento, setAlojamiento] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(dayjs().format("YYYY-MM-DD"));
    const [fechaFin, setFechaFin] = useState(dayjs().format("YYYY-MM-DD"));
    const [cantidadHuespedes, setCantidadHuespedes] = useState(1);
    const [total, setTotal] = useState(0);
    const [fechasReservadas, setFechasReservadas] = useState([]);

    const cargarAlojamiento = async () => {
        try {
            const response = await axios.get(`/api/alojamiento/${id}`);
            setAlojamiento(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const cargarFechasReservadas = async () => {
        try {
            const response = await axios.get(`/api/reserva/fechas-reservadas/${id}`);
            setFechasReservadas(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    // Función auxiliar para verificar si una fecha está en el rango reservado
    const isDateDisabled = (date) => {
        return fechasReservadas.some(({ fechaInicio, fechaFin }) => {
            const startDate = dayjs(fechaInicio);
            const endDate = dayjs(fechaFin);
            return dayjs(date).isBetween(startDate, endDate, null, '[]');
        });
    };


    const handleCantidadHuespedes = (e) => {
        const value = parseInt(e.target.value);
        if (value <= alojamiento.cantidadHuespedes) {
            setCantidadHuespedes(value);
        } else {
            alert(`La capacidad máxima de este alojamiento es de ${alojamiento.cantidadHuespedes} huéspedes.`);
        }
    };

    const calcularTotal = () => {
        const dias = dayjs(fechaFin).diff(dayjs(fechaInicio), "day");
        setTotal(dias * alojamiento.precioPorNoche);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            return navegar("/login");
        }
        try {
            await axios.post("/api/reserva", {
                usuario: user._id,
                alojamiento: id,
                fechaInicio,
                fechaFin,
                cantidadHuespedes
            });
            console.log("Reserva confirmada");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            cargarAlojamiento();
            cargarFechasReservadas();
        }
        
    }, [id]);

    useEffect(() => {
        if (fechaInicio && fechaFin && alojamiento) {
            calcularTotal();
        }
    }, [fechaInicio, fechaFin, alojamiento]);

    if (!alojamiento) return '';

    return (
        <div className="flex justify-center py-8 px-4">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Título y Ubicación */}
                <div className="p-6">
                    <h1 className="text-3xl font-semibold mb-2">{alojamiento.titulo}</h1>
                    <a 
                        className="text-blue-600 underline hover:text-blue-800"
                        href={`https://maps.google.com/?q=${alojamiento.direccion}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {alojamiento.direccion}
                    </a>
                </div>

                {/* Contenedor principal: Imagen y Sección de Reserva */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                    {/* Imagen del Alojamiento */}
                    <div className="h-80 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                        {alojamiento.fotos?.[0] && (
                            <img src={alojamiento.fotos[0]} alt="Imagen del Alojamiento" className="w-full h-full object-cover" />
                        )}
                    </div>

                    {/* Sección de Reserva Minimalista */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <div className="flex items-baseline space-x-1 mb-6">
                            <span className="text-3xl font-bold">${alojamiento.precioPorNoche}</span>
                            <span className="text-lg text-gray-600">/ noche</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Fecha de Inicio y Fin */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Fecha de Inicio */}
                                <div>
                                    <label className="text-gray-700 text-sm">Check-in</label>
                                    <input 
                                        type="date" 
                                        value={fechaInicio}
                                        onChange={(e) => setFechaInicio(e.target.value)}
                                        className="w-full border-b border-gray-300 focus:outline-none focus:border-black p-1 text-sm"
                                        disabled={isDateDisabled(fechaInicio)}
                                    />
                                </div>

                                {/* Fecha de Fin */}
                                <div>
                                    <label className="text-gray-700 text-sm">Check-out</label>
                                    <input 
                                        type="date" 
                                        value={fechaFin}
                                        onChange={(e) => setFechaFin(e.target.value)}
                                        className="w-full border-b border-gray-300 focus:outline-none focus:border-black p-1 text-sm"
                                        disabled={isDateDisabled(fechaFin)}
                                    />
                                </div>
                            </div>

                            {/* Cantidad de Huéspedes */}
                            <div>
                                <label className="text-gray-700 text-sm">Huéspedes</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    max={alojamiento.cantidadHuespedes}
                                    value={cantidadHuespedes} 
                                    onChange={handleCantidadHuespedes} 
                                    className="w-full border-b border-gray-300 focus:outline-none focus:border-black p-1 text-sm"
                                />
                            </div>

                            {/* Total y botón de confirmación */}
                            <div className="flex items-center justify-between mt-6">
                                <span className="text-lg font-semibold">Total: ${total}</span>
                                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                    Reservar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Descripción y Servicios */}
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{alojamiento.descripcion}</p>

                    <h2 className="text-2xl font-semibold mb-4">Servicios</h2>
                    <ul className="grid grid-cols-2 gap-2 text-gray-700 mb-6">
                        {alojamiento.servicios?.wifi && <li>✅ Wifi</li>}
                        {alojamiento.servicios?.smartTV && <li>✅ SmartTV</li>}
                        {alojamiento.servicios?.mascotas && <li>✅ Mascotas</li>}
                        {alojamiento.servicios?.estacionamiento && <li>✅ Estacionamiento</li>}
                        {alojamiento.servicios?.parlante && <li>✅ Parlante</li>}
                        {alojamiento.servicios?.entradaPrivada && <li>✅ Entrada Privada</li>}
                    </ul>

                    {/* Información adicional */}
                    <h2 className="text-2xl font-semibold mb-4">Información adicional</h2>
                    <p className="text-gray-700">{alojamiento.informacionExtra}</p>
                </div>
            </div>
        </div>
    );
};

export default PlacePage;