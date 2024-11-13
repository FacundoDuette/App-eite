import axios from "axios";
import { useState, useEffect, useContext } from "react";
import userContext from "../components/userContext";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useNavigate, useParams } from "react-router-dom";
dayjs.extend(isBetween);

const BookingPage = () => {
    const { user } = useContext(userContext.userContext);
    const navegar = useNavigate();
    const { action, id } = useParams();

    // const [resUserId, setResUserId] = useState(null);
    const [alojamiento, setAlojamiento] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(dayjs().format("YYYY-MM-DD"));
    const [fechaFin, setFechaFin] = useState(dayjs().format("YYYY-MM-DD"));
    const [cantidadHuespedes, setCantidadHuespedes] = useState(1);
    const [total, setTotal] = useState(0);
    const [fechasReservadas, setFechasReservadas] = useState([]);
    const [errores, setErrores] = useState([]);

    const [check, setCheck] = useState(false); //check para comprobar si el usuario desea realmente editar

    const handleCheckboxChange = () => {    //Func. para cambiar el estado del check
        setCheck(!check)
    }

    const cargarAlojamiento = async (index) => {
        try {
            const response = await axios.get(`/api/alojamiento/${index}`);
            setAlojamiento(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const cargarReserva = async () => {
        try {
            const response = await axios.get(`/api/reserva/${id}`);
            const data = response.data;
            if (user._id === data.reserva.usuario) {
                // setResUserId(data.reserva.usuario)
                setFechaInicio(dayjs(data.reserva.fechaInicio).format("YYYY-MM-DD"));
                setFechaFin(dayjs(data.reserva.fechaFin).format("YYYY-MM-DD"));
                setCantidadHuespedes(data.reserva.cantidadHuespedes);
                setTotal(data.reserva.total);
                cargarAlojamiento(data.reserva.alojamiento);
            } else {
                console.log("No es el usuario que registró esta reserva")
                navegar("/");
            }
        } catch (error) {
            console.log(error);
        }
    }


    //Funcion para cargar fechas reservadas, No utilizada por el momento
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
        if (action === 'edit' && !check) {
            return navegar(-1)
        }
        if (action === 'new' && user) {
            try {
                await axios.post("/api/reserva", { usuario: user._id, alojamiento: id, fechaInicio, fechaFin, cantidadHuespedes });
                navegar('/account/bookings')
            } catch (error) {
                setErrores(error.response.data.error.errors)
            }
        } else if (action === 'edit' && user) {
            try {
                await axios.patch(`/api/reserva/${id}`, { fechaInicio, fechaFin, cantidadHuespedes });
                navegar('/account/bookings')
            } catch (error) {
                setErrores(error.response.data.error.errors)
            }
        };
    }

    useEffect(() => {
        if (action === 'new' && id) {
            cargarAlojamiento(id);
            // cargarFechasReservadas();
        }
        if (action === 'edit' && user !== undefined && id) {
            cargarReserva();
            // cargarFechasReservadas();
        }
    }, [id]);

    useEffect(() => {
        if (fechaInicio && fechaFin && alojamiento) {
            handleSetFechas(fechaInicio, fechaFin);
        }
    }, [fechaInicio, fechaFin, alojamiento]);

    if (!alojamiento) return '';

    const handleSetFechas = (fechaInicio, fechaFin) => {
        if (fechaFin <= fechaInicio) {
            setFechaFin(dayjs(fechaInicio).add(1, 'day').format('YYYY-MM-DD'));
        }
        calcularTotal();
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/reserva/${id}`);
            navegar('/account/bookings')
        } catch (error) {
            console.log(error);
        }
    }

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
                {(action === 'edit') &&
                    <label
                        htmlFor="toggleFour"
                        className="ml-6 flex items-center cursor-pointer select-none text-dark dark:text-white"
                    >
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="toggleFour"
                                className="peer sr-only"
                                value={check}
                                onChange={handleCheckboxChange}
                            />
                            <div
                                className="block h-8 rounded-full box bg-dark dark:bg-dark-2 w-14 peer-checked:bg-primary"
                            ></div>
                            <div
                                className="absolute flex items-center justify-center w-6 h-6 transition bg-white rounded-full dot left-1 top-1 dark:bg-dark-5 peer-checked:translate-x-full peer-checked:dark:bg-white"
                            ></div>
                        </div>
                    </label>
                }

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
                                        disabled={(action === 'edit' && !check)}
                                        type="date"
                                        value={fechaInicio}
                                        onChange={(e) => setFechaInicio(e.target.value)}
                                        className="w-full border-b border-gray-300 focus:outline-none focus:border-black p-1 text-sm"
                                    // disabled={isDateDisabled(fechaInicio)}
                                    />
                                    <p className="text-red-500 text-sm" hidden={errores?.fechaInicio ? false : true}>{errores?.fechaInicio?.message}</p>
                                </div>

                                {/* Fecha de Fin */}
                                <div>
                                    <label className="text-gray-700 text-sm">Check-out</label>
                                    <input
                                        disabled={(action === 'edit' && !check)}
                                        type="date"
                                        value={fechaFin}
                                        onChange={(e) => setFechaFin(e.target.value)}
                                        className="w-full border-b border-gray-300 focus:outline-none focus:border-black p-1 text-sm"
                                    // disabled={isDateDisabled(fechaFin)}
                                    />
                                    <p className="text-red-500 text-sm" hidden={errores?.fechaFin ? false : true}>{errores?.fechaFin?.message}</p>
                                </div>
                            </div>

                            {/* Cantidad de Huéspedes */}
                            <div>
                                <label className="text-gray-700 text-sm">Huéspedes</label>
                                <input
                                    disabled={(action === 'edit' && !check)}
                                    type="number"
                                    min="1"
                                    max={alojamiento.cantidadHuespedes}
                                    value={cantidadHuespedes}
                                    onChange={handleCantidadHuespedes}
                                    className="w-full border-b border-gray-300 focus:outline-none focus:border-black p-1 text-sm"
                                />
                                <p className="text-red-500 text-sm" hidden={errores?.cantidadHuespedes ? false : true}>{errores?.cantidadHuespedes?.message}</p>
                                <p className="text-gray-400 text-sm">Huéspedes máx: {alojamiento.cantidadHuespedes}</p>
                            </div>

                            {/* Total y botón de confirmación */}
                            <div className="flex items-center justify-between mt-6">
                                <span className="text-lg font-semibold flex-1">Total: ${total}</span>
                                <button type="submit" className="bg-blue-600 text-white py-1 px-2 rounded-lg hover:bg-blue-700 transition-colors flex-1">
                                    {action === 'new' ? 'Reservar' : check ? 'Guardar' : 'Regresar'}
                                </button>
                                {action === 'edit' && check && (
                                    <button onClick={handleDelete} className="bg-red-600 text-white py-1 px-2 rounded-lg hover:bg-red-700 transition-colors flex-1">
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Descripción y Servicios */}
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{alojamiento.descripcion}</p>

                    <h3 className="text-2xl font-semibold mb-4">Cantidad de Huespedes: {alojamiento.cantidadHuespedes}</h3>

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

export default BookingPage;