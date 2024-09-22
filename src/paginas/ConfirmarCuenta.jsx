import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import clientesAxios from "../config/axios.jsx";

const ConfirmarCuenta = () => {
    const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
    const [ cargando, setCargando ] = useState(true);
    const [ alerta, setAlerta ] = useState({});

    const params = useParams();  // Retorna un objeto con los parametros que puedan haber en la URL en el que estemos
    const { id } = params;

    useEffect(() => {  // Puede ser muy util para ejecutar acciones una sola vez cuando el componente cargue
      const confirmarCuenta = async () => {
        try {
          
          const url = `/veterinarios/confirmar/${id}`;
          const { data } = await clientesAxios(url);  // Si vamos a hacer una consulta a una api con metodo get, entonces solo le pasamos por parametros la URL de la api. Podremos acceder a la informacion enviada con res.json() por medio de la propiedad data, asi que, podemos usar destructuring
          setCuentaConfirmada(true);
          setAlerta({
            msg: data.msg,
          });

        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          });
        }

        setCargando(false);
      }
      confirmarCuenta();
    }, []);

    return (
      <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y Comienza a Administrar tus <span className="text-black">Pacientes</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {!cargando && 
          <Alerta 
            alerta={alerta}
          />}

          {cuentaConfirmada && 
            <Link 
            className="block text-center my-5 text-gray-500"
            to="/">Iniciar Sesion</Link>
          }
        </div>
      </>
    )
}
  
  export default ConfirmarCuenta