import { useState, useEffect } from 'react';
import axios from 'axios';

const useServicios = () =& gt; {

    const [servicios, setServicios] = useState([]);

    const getServicios = async() =& gt; {
        const url = `http://localhost:3000/api/servicio`;
        const resultado = await axios.get(url);
        setServicios(resultado.data);
    }

    useEffect(() =& gt; {
        getServicios();
    }, []);

    return servicios;
}
export default useServicios;

export default function Servicios() {

    const servicio = useServicios();

    return ( & lt;div className = "container" & gt; { servicio.map((servicio) =& gt; { return (& lt;div key = { servicio._id } className = "card" style = {{ width: "18rem" } }& gt; & lt;img src = { servicio.imagen } className = "card-img-top" alt = "..." /& gt; & lt;div className = "card-body" & gt; & lt;h5 className = "card-title" & gt; { servicio.nombre }& lt; /h5&gt; &lt;p className="card-text"&gt;{servicio.descripcion}&lt;/p & gt; & lt;a href = "#" className = "btn btn-primary" & gt;Go somewhere & lt; /a&gt; &lt;/div & gt; & lt; /div&gt;)})}&lt;/div & gt; ) } 