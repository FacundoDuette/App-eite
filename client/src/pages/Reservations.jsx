import axios from "axios"
import { useState, useEffect, useContext } from "react"
import userContext from "../components/userContext";
import { format } from 'date-fns';


const Reservations = () => {
    const { user, cargado } = useContext(userContext.userContext);
    const [usuario,setUsuario] = useState()
    const [alojamiento,setAlojamiento] = useState()
    const [fechaInicio,setFechaInicio] = useState()
    const [fechaFin,setFechaFin] = useState()
    const [cantidadHuespedes,setCantidadHuespedes] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Crear validaciones...

        setUsuario('671d805cebe38adf2f25b0fb')
        setAlojamiento('672fd4508a1cf21173cb6f94')

        try {
            const response = await axios.post('/api/reserva', {usuario,alojamiento,fechaInicio,fechaFin,cantidadHuespedes})
        console.log(response)
        }catch (error) {
            console.log(error)
        }

    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Fecha Inicio</label>
                    <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)}/>
                </div>
                <div>
                    <label>Fecha Fin</label>
                <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)}/>
                </div>
                <div><label>Cantidad huespedes</label><input type="number" value={cantidadHuespedes} onChange={(e) => setCantidadHuespedes(e.target.value)} placeholder="ingresa la cantidad de huspedes que quieres reservar en un alojamiento" /></div>
                <button type='submit'>Enviar datos</button>
            </form>
        </>
    )
}

export default Reservations