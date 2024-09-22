import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout.jsx";
import RutaProtegida from "./layout/RutaProtegida.jsx";

import Login from "./paginas/Login.jsx";
import Registrar from "./paginas/Registrar.jsx";
import OlvidePassword from "./paginas/OlvidePassword.jsx";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta.jsx";
import NuevoPassword from "./paginas/NuevoPassword.jsx";
import AdministrarPacientes from "./paginas/AdministrarPacientes.jsx";
import EditarPerfil from "./paginas/EditarPerfil.jsx";
import CambiarPassword from "./paginas/CambiarPassword.jsx";

import { AuthProvider } from "./context/AuthProvider.jsx";  // Todas las rutas que esten dentro del AuthProvider podran a acceder a los states globales que les pasamos en el value
import { PacientesProvider } from "./context/PacientesProvider.jsx";

function App() {

  //console.log(import.meta.env.VITE_BACKEND_URL);  // De esta manera podemos acceder a nuestras variables de entorno en el backend. Los nombres de las variables de entorno por el lado del frontend deben empezar con VITE_
  //Los contexts los agregamos encerrando el componente <Routes></Routes>. Podemos agregar varios contexts colocandolos uno dentro del otro segun su importancia
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
            </Route>

            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;