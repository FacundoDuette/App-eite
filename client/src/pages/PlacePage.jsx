import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const PlacePage =()=>{
    const {id} = useParams();
    const [alojamiento, setAlojamiento] = useState(null);
    
    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get(`/api/alojamiento/${id}`).then(response =>{
        setAlojamiento(response.data);
      });
    }, [id]);

    if(!alojamiento) return '';
    

    return(
        <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{alojamiento.titulo}</h1>
            <a className="my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+alojamiento.address}>{alojamiento.address}</a>
            <div className="grid gap-2 grid-cols-[2fr_1fr]">
                <div>
                    {alojamiento.photos?.[0] && (
                        <div>
                            <img className="aspect-square object-cover" src={'http://localhost:8080/uploads'+alojamiento.photos[0]} alt="" />
                        </div>
                    )}
                </div>
                <div className="grid">
                    {alojamiento.photos?.[1] && (
                        <img className="aspect-square object-cover" src={'http://localhost:8080/uploads'+alojamiento.photos[1]} alt="" />
                    )}
                </div>
                <div className="border borde">
                    {alojamiento.photos?.[2] && (
                        <img className="aspect-square object-cover relative top-2" src={'http://localhost:8080/uploads'+alojamiento.photos[2]} alt="" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PlacePage