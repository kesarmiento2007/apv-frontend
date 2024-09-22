import { useContext } from "react";
import AuthContext from "../context/AuthProvider.jsx";

const useAuth = () => {  // Podemos crear un hook para hacer mas limpio el obtener los valores que pueda tener un Context Provider
    return useContext(AuthContext);  // Para acceder a los valores de un Context Provider creado con un context, retornamos useContext() teniendo en sus parametros el context con el que creamos el Context Provider
}

export default useAuth;