import axios from "axios"
import { useState, useEffect, useContext } from "react"
import userContext from "../components/userContext";
import dayjs from "dayjs"


const ReservationsForm = () => {
    const { user, cargado } = useContext(userContext.userContext);
    const [usuario, setUsuario] = useState('')
    const [alojamiento, setAlojamiento] = useState('')
    const [fechaInicio, setFechaInicio] = useState(dayjs())
    const [fechaFin, setFechaFin] = useState(dayjs())
    const [cantidadHuespedes, setCantidadHuespedes] = useState(1)
    const [notas, setNotas] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Crear validaciones...

        setUsuario('671d805cebe38adf2f25b0fb')
        setAlojamiento('672fd4508a1cf21173cb6f94')

        try {
            const response = await axios.post('/api/reserva', { usuario, alojamiento, fechaInicio, fechaFin, cantidadHuespedes, notas })
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <button type='submit'>Enviar datos</button>
            </form>
        </>
    )
}

export default ReservationsForm