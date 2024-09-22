import { useState, useEffect, createContext } from "react";
import clientesAxios from "../config/axios";

const AuthContext = createContext();  // Con el hook createContext podemos crear un context. Con ese context que creemos podremos crear el elemento Context Provider al que le pasaremos como valores los states que queremos globales, y podremos acceder a ellos retornando un useContext() que tenga por parametros el context que creamos (podemos crear un hook que haga eso para hacerlo mas accesible)

const AuthProvider = ({children}) => {  // El prop children representa los elementos hijos que esten dentro del Context Provider

    const [ cargando, setCargando ] = useState(true);
    const [ auth, setAuth ] = useState({});

    useEffect(() => {  // useEffect() se ejecuta solo una vez cuando cargue el componente, entonces nos puede ser util para ciertas situaciones como obtener datos de una base de datos
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");
            if(!token) {
                setCargando(false);
                return;
            }

            const config = {  // Creamos la configuracion para que se pueda verificar desde un middleware del backend si iniciamos sesion para acceder a apis protegidas
                headers: {  // los headers se envian antes de toda la peticion, entonces pasaremos el token por ahi y haremos que el middleware de auth de nuestro backend busque el token por los headers
                    "Content-Type": "application/json",  // Debemos indicar este "Content-Type":"application/json"
                    Authorization: `Bearer ${token}`  // Indicamos en la propiedad Authorization el Bearer token
                }
            }

            try {
                const { data } = await clientesAxios("/veterinarios/perfil", config);  // Para verificar si el usuario inicio sesion, le pasamos a las consultas axios como ultimo parametro la configuracion que contiene en los headers el Bearer token para que el middleware de auth que tenemos en el backend lo pueda verificar y darnos acceso a la api
                
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando(false);
        }
        autenticarUsuario();
    }, []);  // Si no vamos a agregar ningun state, dejamos el arreglo vacio

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        setAuth({});
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem("token");

        const config = { 
            headers: { 
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await clientesAxios.put(url, datos, config);

            setAuth(data);

            return {
                msg: "Almacenado Correctamente",
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async datos => {
        const token = localStorage.getItem("token");

        const config = { 
            headers: { 
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = "/veterinarios/actualizar-password";

            const { data } = await clientesAxios.put(url, datos, config);
            
            return {
                msg: data.msg,
                error: false
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider  // Creamos el elemento de Context Provider usando el context que creamos (AuthProvider)
            value={{  // Al Context Provider le podemos pasar un objeto con states como value, y como todas nuestras rutas estaran dentro de este context los states seran globales, podremos acceder a ellos desde cualquier ruta, y tambien modificarlos si le pasamos sus set, y podemos tambien pasarle funciones para llamarlos en alguna ruta y pasarles valores
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;