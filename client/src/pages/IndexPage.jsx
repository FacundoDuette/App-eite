// import ListaAlojamientos from "../components/ListaAlojamientos"

import axios from "axios";
import { useEffect, useState } from "react";
import CardAlojamiento from "../components/CardAlojamiento";

export default function IndexPage() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [cargado, setCargado] = useState(false);

  //Estados para los filtros
  const [filtroDireccion, setFiltroDireccion] = useState([]);
  const [filtroPrecio, setFiltroPrecio] = useState([]);
  const [filtroCantidad, setFiltroCantidad] = useState([]);
  const [copiaAlojamientos, setCopiAlojamientos] = useState([]);

  const cargarAlojamientos = async () => {
    try {
      const response = await axios.get("/api/alojamiento");
      setAlojamientos(response.data);
      setCopiAlojamientos(response.data);
      setCargado(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = () => {
    const filtro = filtroDireccion || filtroPrecio || filtroCantidad;
    let alojFiltrados = copiaAlojamientos;
    if (filtro !== "") {
      if (filtroDireccion !== "") {
        alojFiltrados = alojFiltrados.filter((alojamiento) =>
          alojamiento.direccion.includes(filtro)
        );
        setAlojamientos(alojFiltrados);
      }
      if (filtroPrecio !== "") {
        alojFiltrados = alojFiltrados.filter(
          (alojamiento) => alojamiento.precioPorNoche <= filtro
        );
        setAlojamientos(alojFiltrados);
      }
      if (filtroCantidad !== "") {
        alojFiltrados = alojFiltrados.filter(
          (alojamiento) => alojamiento.cantidadHuespedes >= filtro
        );
        setAlojamientos(alojFiltrados);
      }
    } else {
      setAlojamientos(copiaAlojamientos);
    }
  };

  useEffect(() => {
    !cargado && cargarAlojamientos();
  }, [cargado]);
  // darle un onclick al boton de la lupa para que ejecute la funcion handleFilter y este handleFilter tiene que modificar "alojamientos" con los alojamientos ya filtrados
  return (
    <div className="flex flex-col justify-center">
      <div className="mx-auto container max-w-xl flex gap-2 border border-gray-300 rounded-full py-1 shadow-md shadow-gray-300">
        <div className="flex flex-row items-center">
          <span className="mr-2 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </span>
          <input
            name="direccion"
            className="border-none text-center w-0 my-1 p-1 px-1 rounded-2xl"
            type="text"
            value={filtroDireccion}
            onChange={(e) => (
              setFiltroDireccion(e.target.value), handleFilter()
            )}
            placeholder="Ubicación"
          />
        </div>
        <div className="border-l border-gray-300"></div>
        <div className="flex flex-row items-center">
        <span className="mr-2 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </span>
          <input
            name="precio"
            className="border-none text-center w-0 my-1 p-1 px-1 rounded-2xl"
            type="text"
            value={filtroPrecio}
            onChange={(e) => (setFiltroPrecio(e.target.value), handleFilter())}
            placeholder="Tarifa"
          />
        </div>
        <div className="border-l border-gray-300"></div>
        <div className="flex flex-row items-center">
        <span className="mr-2 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
            </span>
          <input
            name="cantidad"
            className="border-none text-center w-0 my-1 p-1 px-1 rounded-2xl"
            type="text"
            value={filtroCantidad}
            onChange={(e) => (
              setFiltroCantidad(e.target.value), handleFilter()
            )}
            placeholder="Huespedes"
          />
        </div>
        {/* <button className='bg-primary text-white px-4 rounded-full' onClick={handleFilter}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button> */}
      </div>
      <div className="flex flex-wrap gap-3 pb-4 mt-4 justify-center">
        {
            alojamientos?.length > 0 ?
        alojamientos?.map((alojamiento, index) => {
          return <CardAlojamiento key={index} {...alojamiento} />;
        }) :
        <p className="text-center text-2xl">No se encontró ningún alojamiento</p>
        }
      </div>
    </div>
  );
}
