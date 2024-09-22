// El archivo donde creemos un cliente de axios, lo podemos crear dentro de una carpeta que le llamemos config
import axios from "axios";

const clientesAxios = axios.create({  // Con el metodo create() podemos crear un cliente de axios, dandonos la posibilidad de crear una URL base pasandoselo por parametros en un objeto, y de esta manera al hacer las consultas de axios con esta variable, no tendremos que incluir la URL que ya guardamos en el cliente axios
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`  // Se recomienda ocultar el dominio de nuestras apis en una variable de entorno
});

export default clientesAxios;