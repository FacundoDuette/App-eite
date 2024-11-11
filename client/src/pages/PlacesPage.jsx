import { Link, useNavigate, useParams } from "react-router-dom";
import PlaceFormPage from "../components/PlaceFormPage";
import { useContext, useEffect, useState } from "react";
import userContext from "../components/userContext";
import axios from "axios";
import CardAlojamiento from "../components/CardAlojamiento";


const PlacesPage = () => {

    const { user } = useContext(userContext.userContext);
    const { action } = useParams();
    const navegar = useNavigate();

    const [userAlojamientos, setUserAlojamientos] = useState([])

    const cargarAlojamientosUser = async () => {
        try {
            const response = await axios.get(`/api/alojamiento/user/${user._id}`)
            setUserAlojamientos(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // const editarAlojamiento = (alojId) => {
    //     navegar(`/account/places/edit/${alojId}`)
    // }

    useEffect(() => {
        if (action !== 'new' && action !== 'edit') {
            cargarAlojamientosUser()
        }
    })

    return (
        <div>
            {action !== 'new' && action !== 'edit' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                        to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Agregar nuevo alojamiento
                    </Link>
                    <div className="flex space-x-4 pb-4 mt-4 overflow-x-scroll"> {/* overflow-x-scroll */}
                        {userAlojamientos?.length <= 0 ? <h4>No se encontraron alojamientos para este usuario</h4> : (
                            userAlojamientos?.map((alojamiento, index) => {
                                return (
                                    <CardAlojamiento key={index} {...alojamiento} />
                                    // <div key={index} style={{ padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', margin: '20px 10vh' }}>
                                    //     {/* Se puede hacer un boton para "/account/bookings/new/:id" para otros alojamientos, pero en estos Cards NO porque un dueño no puede auto reservarse */}
                                    //     {/* También podemos añadir un botón de eliminar Alojamiento, con una confirmación por Alert... */}
                                    //     <button onClick={() => editarAlojamiento(alojamiento._id)}>Editar</button>
                                    //     <h2>{alojamiento.titulo}</h2>
                                    //     <h3>{alojamiento.direccion}</h3>
                                    // </div>
                                )
                            })
                        )}
                    </div>
                </div>
            )
            }
            {
                action === 'new' && (
                    <PlaceFormPage />
                )
            }
            {
                action === 'edit' && (
                    <PlaceFormPage />
                )
            }
        </div >
    )
}

export default PlacesPage;