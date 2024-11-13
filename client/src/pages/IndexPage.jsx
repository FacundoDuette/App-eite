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
// darle un onclick al boton de la lupa para que ejecute la funcion handleFilter y este handleFilter tiene que modificar "alojamientos" con los alojamientos ya filtrados
    return (
        <div className="flex flex-col justify-center">
            <div className='mx-auto container max-w-xl flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
                <div>
                    <input className="border-none" type="text" placeholder="Cualquier lugar" />
                </div>
                <div className="border-l border-gray-300"></div>
                <div>
                    <input className="border-none" type="text" placeholder="Cualquier semana" />
                </div>
                <div className="border-l border-gray-300"></div>
                <div>
                    <input className="border-none" type="text" placeholder="Cantidad de personas" />
                </div>
                <button className='bg-primary text-white px-4 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-wrap gap-2 space-x-4 pb-4 mt-4">
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