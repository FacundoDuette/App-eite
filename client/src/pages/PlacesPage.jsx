import { Link } from "react-router-dom";


const PlacesPage = () => {
    return (
        <div>
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Agregar nuevo alojamiento
                </Link>
            </div>
            <div>
                <form>
                    <h2 className="text-2xl mt-4">Título</h2>
                    <p className="text-gray-500 text-sm">El título del alojamiento debe ser corto y preciso.</p>
                    <input type="text" placeholder="título" />
                    <h2 className="text-xl mt-4">Dirección</h2>
                    <p className="text-gray-500 text-sm">Dirección del alojamiento.</p>
                    <input type="text" placeholder="direccion " />
                    <h2 className="text-xl mt-4">Fotos</h2>
                    <p className="text-gray-500 text-sm">Fotos del alojamiento</p>
                    <div className="flex gap-2">
                        <input type="text" placeholder="agregar usando un link ...jpg" />
                        <button className="bg-gray-200 px-4 rounded-2xl">
                            Agregar foto
                        </button>
                    </div>
                    <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cold-6">
                        <button className="flex justify-center border bg-transparent rounded-2xl p-8 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                            Subir foto
                        </button>
                    </div>
                    <h2 className="text-xl mt-4">Descripción</h2>
                    <p className="text-gray-500 text-sm">Descripción del alojamiento</p>
                    <textarea/>
                </form>
            </div>
        </div>
    )
}

export default PlacesPage;