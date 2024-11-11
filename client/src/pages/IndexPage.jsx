// import ListaAlojamientos from "../components/ListaAlojamientos"

import axios from "axios"
import { useEffect, useState } from "react"
import CardAlojamiento from "../components/CardAlojamiento"

export default function IndexPage() {
    const [alojamientos, setAlojamientos] = useState([])
    const [cargado, setCargado] = useState(false)

    const cargarAlojamientos = async () => {
        try {
            const response = await axios.get('/api/alojamiento')
            setAlojamientos(response.data)
            setCargado(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        !cargado && cargarAlojamientos()
    })

    return (
        <div>
            <h1>Alojamientos</h1>
            <div className="flex space-x-4 pb-4 mt-4 overflow-x-scroll">
                {
                    alojamientos?.map((alojamiento, index) => {
                        return (
                            <CardAlojamiento key={index} {...alojamiento} />
                        )
                    })
                }
            </div>
        </div>
    )
}