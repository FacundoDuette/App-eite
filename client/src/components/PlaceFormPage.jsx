import { useParams, Link, useNavigate } from "react-router-dom";
import userContext from "../components/userContext";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

const PlaceFormPage = () => {
    const { user } = useContext(userContext.userContext);
    const usuarioId = user._id || '';
    const { action, id } = useParams();
    const [cargado, setCargado] = useState(false);
    const [check, setCheck] = useState(false);
    const [errores, setErrores] = useState([]);
    const navegar = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fotos, setFotos] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [servicios, setServicios] = useState({
        wifi: false,
        smartTV: false,
        mascotas: false,
        estacionamiento: false,
        parlante: false,
        entradaPrivada: false
    });

    const serviciosConIconos = {
        wifi: {
            label: "Wifi",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
            )
        },
        smartTV: {
            label: "Smart TV",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
            )
        },
        mascotas: {
            label: "Mascotas",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="size-6">
                    <path d="m3.178,14c-.541,0-1.072-.201-1.549-.589-.854-.694-1.44-1.924-1.57-3.292-.211-2.222.854-3.909,2.589-4.104.707-.077,1.408.13,1.972.588.755.614,1.236,1.633,1.354,2.871h0c.224,2.345-.896,4.327-2.55,4.512-.082.009-.163.014-.244.014Zm-.232-7c-.062,0-.125.003-.187.011-1.16.129-1.861,1.369-1.705,3.015.105,1.106.556,2.082,1.206,2.61.234.191.604.408,1.051.357,1.069-.119,1.832-1.687,1.667-3.423h0c-.092-.969-.443-1.746-.989-2.189-.309-.25-.666-.38-1.043-.38Zm17.876,7c-.081,0-.163-.005-.244-.014-1.653-.185-2.773-2.167-2.55-4.512.118-1.237.598-2.257,1.354-2.871.563-.458,1.267-.665,1.972-.588,1.736.194,2.801,1.882,2.589,4.104-.13,1.367-.717,2.598-1.57,3.292-.478.388-1.009.589-1.549.589Zm.232-7c-.377,0-.734.13-1.043.38-.545.443-.896,1.221-.989,2.189-.165,1.736.598,3.304,1.667,3.423.444.05.817-.167,1.051-.357.65-.528,1.101-1.503,1.206-2.61.157-1.646-.544-2.885-1.705-3.015-.062-.007-.125-.011-.187-.011Zm-5.258,1c-.078,0-.155-.004-.233-.012-.831-.086-1.55-.629-2.024-1.528-.439-.833-.619-1.889-.506-2.972C13.266,1.26,14.662-.17,16.396.015c.835.087,1.555.545,2.026,1.29.471.745.661,1.714.546,2.803-.234,2.239-1.604,3.893-3.171,3.893Zm.316-7c-1.077,0-1.922,1.035-2.085,2.592-.093.889.048,1.742.396,2.401.313.594.755.949,1.243,1,1.077.102,2.126-1.258,2.307-2.991h0c.09-.862-.047-1.61-.397-2.164-.309-.487-.752-.774-1.284-.83-.061-.006-.12-.009-.179-.009Zm-7.909,7c-1.568,0-2.937-1.653-3.171-3.893h0c-.114-1.088.075-2.058.546-2.803C6.05.56,6.77.102,7.604.015c1.75-.188,3.13,1.245,3.362,3.472.113,1.084-.066,2.14-.506,2.973-.474.899-1.193,1.441-2.024,1.528-.078.008-.156.012-.233.012Zm-.316-7c-.059,0-.119.003-.179.009-.532.056-.976.343-1.284.83-.35.553-.487,1.301-.397,2.164h0c.181,1.733,1.241,3.093,2.307,2.991.488-.051.93-.406,1.243-1,.348-.66.489-1.513.396-2.402-.163-1.556-1.008-2.591-2.085-2.591Zm9.613,23c-.734,0-1.476-.211-2.261-.434-.933-.265-1.99-.566-3.239-.566s-2.307.301-3.239.566c-.785.223-1.526.434-2.261.434-1.686,0-3.5-1.095-3.5-3.5,0-4.708,4.923-8.5,9-8.5s9,3.792,9,8.5c0,2.405-1.814,3.5-3.5,3.5Zm-5.5-2c1.389,0,2.518.321,3.513.604.747.212,1.393.396,1.987.396,1.153,0,2.5-.655,2.5-2.5,0-4.039-4.399-7.5-8-7.5s-8,3.461-8,7.5c0,1.845,1.347,2.5,2.5,2.5.595,0,1.24-.184,1.987-.396.995-.283,2.124-.604,3.513-.604Z" />
                </svg>
            )
        },
        estacionamiento: {
            label: "Estacionamiento",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
            )
        },
        parlante: {
            label: "Parlante/Equipo de sonido",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
            )
        },
        entradaPrivada: {
            label: "Entrada Privada",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
            )
        }
    };

    const [informacionExtra, setInformacionExtra] = useState('');
    const [cantidadHuespedes, setCantidadHuespedes] = useState('');
    const [precioPorNoche, setPrecioPorNoche] = useState('');

    const cargarDatos = async (id) => {
        try {
            const response = await axios.get(`/api/alojamiento/${id}`);
            if (response.data.usuarioId === usuarioId) {
                setInformacionExtra(response.data.informacionExtra);
                setCantidadHuespedes(response.data.cantidadHuespedes);
                setPrecioPorNoche(response.data.precioPorNoche);
                setTitulo(response.data.titulo);
                setDescripcion(response.data.descripcion);
                setDireccion(response.data.direccion);
                setFotos(response.data.fotos);
                setServicios(response.data.servicios);
                setCargado(true);
            }
        } catch (error) {
            console.log(error)
            setErrores(error);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        if (action === 'edit' && id && !cargado) {
            cargarDatos(id);
            setCargado(true);
        }
    }, [id, cargado]);

    const toggleServicio = (servicio) => {
        setServicios((prevServicios) => ({
            ...prevServicios,
            [servicio]: !prevServicios[servicio]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            usuarioId,
            titulo,
            direccion,
            fotos,
            descripcion,
            servicios,
            informacionExtra,
            cantidadHuespedes,
            precioPorNoche
        };
        try {
            const response = (action === 'edit')
                ? await axios.patch(`/api/alojamiento/${id}`, data)
                : await axios.post('/api/alojamiento', { data });
            navegar('/account/places');
        } catch (error) {
            setErrores(error.response.data.error.errors);
        }
    };

    const handleDelete = async () => {
        if (action === 'edit' && check) {
            try {
                await axios.delete(`/api/alojamiento/${id}`)
                navegar('/account/places')
            } catch (error) {
                setErrores(error.response.data.error.errors);
            }
        }
    }

    const handleCheckboxChange = () => {
        setCheck(!check)
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold mb-6 text-center">{action === 'edit' ? "Editar Alojamiento" : "Agregar Alojamiento"}</h2>
                {(action === 'edit') &&
                    <label
                        htmlFor="toggleFour"
                        className="flex items-center cursor-pointer select-none text-dark dark:text-white"
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
                <div className="mb-4">
                    <label className="block text-lg font-semibold">Título</label>
                    <input
                        disabled={(action === 'edit' && !check)}
                        type="text"
                        placeholder="Título del alojamiento"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className='w-full p-2 mt-1 border border-gray-300 rounded'
                    />
                    <p className="text-red-500 text-sm" hidden={errores?.titulo ? false : true}>{errores?.titulo?.message}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold">Dirección</label>
                    <input
                        disabled={(action === 'edit' && !check)}
                        type="text"
                        placeholder="Dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                    />
                    <p className="text-red-500 text-sm" hidden={errores?.direccion ? false : true}>{errores?.direccion?.message}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold">Fotos</label>
                    <div className="flex gap-2">
                        <input
                            disabled={(action === 'edit' && !check)}
                            type="text"
                            placeholder="Agregar link de imagen"
                            value={fotos}
                            onChange={(e) => setFotos(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Agregar</button>
                    </div>
                    <p className="text-red-500 text-sm" hidden={errores?.fotos ? false : true}>{errores?.fotos?.message}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold">Descripción</label>
                    <textarea
                        disabled={(action === 'edit' && !check)}
                        placeholder="Descripción del alojamiento"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                    ></textarea>
                    <p className="text-red-500 text-sm" hidden={errores?.descripcion ? false : true}>{errores?.descripcion?.message}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold">Servicios</label>
                    <div className="grid mt-2 gap-2 grid-cols-2 sm:grid-cols-3">
                        {Object.entries(serviciosConIconos).map(([key, { label, icon }]) => (
                            <label key={key} className="border p-2 flex rounded-md gap-2 items-center cursor-pointer hover:bg-gray-100 transition">
                                <input
                                    disabled={(action === 'edit' && !check)}
                                    type="checkbox"
                                    checked={servicios[key]}
                                    onChange={() => toggleServicio(key)}
                                />
                                {icon}
                                <span>{label}</span>
                            </label>
                        ))}
                    </div>
                    <p className="text-red-500 text-sm" hidden={errores?.servicios ? false : true}>{errores?.servicios?.message}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold">Información Extra</label>
                    <textarea
                        disabled={(action === 'edit' && !check)}
                        placeholder="Reglas de la casa, información adicional..."
                        value={informacionExtra}
                        onChange={(e) => setInformacionExtra(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                    ></textarea>
                    <p className="text-red-500 text-sm" hidden={errores?.informacionExtra ? false : true}>{errores?.informacionExtra?.message}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="mb-4">
                        <label className="block text-lg font-semibold">Cantidad de Huéspedes</label>
                        <input
                            disabled={(action === 'edit' && !check)}
                            type="number"
                            placeholder="Cantidad de huéspedes"
                            value={cantidadHuespedes}
                            onChange={(e) => setCantidadHuespedes(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        <p className="text-red-500 text-sm" hidden={errores?.cantidadHuespedes ? false : true}>{errores?.cantidadHuespedes?.message}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold">Precio por Noche</label>
                        <input
                            disabled={(action === 'edit' && !check)}
                            type="number"
                            placeholder="Precio por noche"
                            value={precioPorNoche}
                            onChange={(e) => setPrecioPorNoche(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        <p className="text-red-500 text-sm" hidden={errores?.precioPorNoche ? false : true}>{errores?.precioPorNoche?.message}</p>
                    </div>
                </div>
                {
                    ((user._id === usuarioId) && action === 'edit' && check == true) ? (<div className="w-full flex gap-4 justify-center">
                        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded mt-6 transition-colors" type="submit">Guardar Cambios</button>
                        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded mt-6 transition-colors" onClick={handleDelete}>Borrar Alojamiento</button>
                    </div>) : action === 'edit' ?
                        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded mt-6 transition-colors" type="submit">Regresar</button> :
                        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded mt-6 transition-colors" type="submit">Crear Alojamiento</button>
                }
            </form>
        </div>
    );
};

export default PlaceFormPage;