import axios from "axios"
import { useState, useEffect, useContext } from "react"
import userContext from "../components/userContext";
import dayjs from "dayjs"
import { useNavigate, useParams } from "react-router-dom";


const ReservationsForm = () => {
    const { user } = useContext(userContext.userContext);

    const navegar = useNavigate()

    const { id } = useParams()

    const [usuario, setUsuario] = useState('')
    const [alojamiento, setAlojamiento] = useState('')
    const [fechaInicio, setFechaInicio] = useState(dayjs())
    const [fechaFin, setFechaFin] = useState(dayjs())
    const [cantidadHuespedes, setCantidadHuespedes] = useState(1)
    const [notas, setNotas] = useState('')

    const [cargado, setCargado] = useState(false)

    const [mostrarAlojamiento, setMostrarAlojamiento] = useState({})

    const cargarAlojamiento = async () => {
        try {
            const response = await axios.get(`/api/alojamiento/${id}`)
            setMostrarAlojamiento(response.data)
            console.log(response.data)
            setCargado(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Crear validaciones...
        try {
            const response = await axios.post('/api/reserva', { usuario, alojamiento, fechaInicio, fechaFin, cantidadHuespedes, notas })
            console.log(response)
            navegar('/account/bookings')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user && !cargado) {
            // setUsuario(user._id);
            id && setAlojamiento(id)
            id && cargarAlojamiento()
        }
    })

    return (
        <>
            <h1>Reservas</h1>
            <form>
                <div>
                    <label>Fecha Inicio</label>
                    <input type="date" value={dayjs(fechaInicio).format('YYYY-MM-DD')} onChange={(e) => setFechaInicio(dayjs(e.target.value).format('YYYY-MM-DD'))} />
                </div>
                <div>
                    <label>Fecha Fin</label>
                    <input type="date" value={dayjs(fechaFin).format('YYYY-MM-DD')} onChange={(e) => setFechaFin(dayjs(e.target.value).format('YYYY-MM-DD'))} />
                </div>
                <div>
                    <label>Cantidad huespedes</label>
                    <input type="number" value={cantidadHuespedes} onChange={(e) => setCantidadHuespedes(e.target.value)} placeholder="ingresa la cantidad de huspedes que quieres reservar en un alojamiento" />
                </div>
                <div>
                    <label>Notas</label>
                    <input type="text" value={notas} onChange={(e) => setNotas(e.target.value)} />
                </div>
                <button type='submit' onClick={handleSubmit}>Enviar datos</button>
            </form>
        </>
    )
}

export default ReservationsForm