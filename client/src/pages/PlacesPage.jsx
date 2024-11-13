import { Link, useParams } from "react-router-dom";
import PlaceFormPage from "../components/PlaceFormPage";
import { useContext, useEffect, useState } from "react";
import userContext from "../components/userContext";
import axios from "axios";
import CardAlojamiento from "../components/CardAlojamiento";

const PlacesPage = () => {
    const { user } = useContext(userContext.userContext);
    const { action } = useParams();
    const [userAlojamientos, setUserAlojamientos] = useState([]);
    const [cargado, setCargado] = useState(false);

    const cargarAlojamientosUser = async () => {
        try {
            const response = await axios.get(`/api/alojamiento/user/${user._id}`);
            setUserAlojamientos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (action !== 'new' && action !== 'edit' && !cargado) {
            cargarAlojamientosUser();
            setCargado(true);
        }
    });

    return (
        <div className="px-6 py-4">
            {action !== 'new' && action !== 'edit' && (
                <div className="text-center mb-6">
                    <Link
                        className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                        to={'/account/places/new'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Agregar nuevo alojamiento
                    </Link>

                    {/* Carrusel horizontal */}
                    <div className="flex flex-wrap space-x-4 pb-4 gap-4 mt-4 justify-center">
                        {userAlojamientos.length === 0 ? (
                            <h4 className="text-gray-700">No se encontraron alojamientos para este usuario</h4>
                        ) : (
                            userAlojamientos.map((alojamiento, index) => (
                                <div key={index} className="snap-start" onClick={() => setCargado(false)} >
                                    <CardAlojamiento {...alojamiento} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
            {action === 'new' && <PlaceFormPage />}
            {action === 'edit' && <PlaceFormPage />}
        </div>
    );
};

export default PlacesPage;