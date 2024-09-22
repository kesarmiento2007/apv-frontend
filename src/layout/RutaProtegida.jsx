import { Outlet, Navigate } from "react-router-dom";  // Navigate puede ser util para redireccionar un usuario estando en una condicion ternario
import Header from "../components/Header";  // Si exportamos funciones por default, los debemos importar sin llaves
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();
    
    if(cargando) return;  // Si el state cargando esta en true, retornamos devolviendonos al inicio del codigo de la funcion, y asi hasta que el cargando este en false significando que ya se completo la consulta para obtener el auth

    //{auth?._id ? <Outlet /> : <Navigate to="/" />}  // Si es verdadero auth, vemos si es verdadero _id para mostrar el Outlet, caso contrario redirigimos a pagina de inicio

    return (
        <>
            <Header />
                {auth?._id ? (
                    <main className="container mx-auto mt-10">
                        <Outlet />
                    </main>
                ) : <Navigate to="/" />}
            <Footer />
        </>
    )
}

export default RutaProtegida;