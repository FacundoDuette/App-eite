import axios from "axios"
import { useState, useEffect } from "react"
import userContext from "../components/userContext"

const Reservations = () => {
    const {user, cargado} = useContext(userContext.userContext)
    const [reservas, setReservas] = useState([])

    const handleSubmit = async () => {
        //Crear validaciones...

        reservas.usuario = user.id
        
        console.log(user.id)

        try {
            const response = await axios.post('/api/reservas', reservas)
        console.log(response)
        }catch (error) {
            console.log(error)
        }

    }

    return(
        <>
            <form>

                <button onClick={handleSubmit}>Enviar datos</button>
            </form>
        </>
    )
}

export default Reservations