import usePacientes from "../hooks/usePacientes.jsx";
import Pacientes from "./Pacientes.jsx";

const ListadoPacientes = () => {

  const { pacientes } = usePacientes();

  return (
    <>
      { pacientes.length ? 
      (
        <>
          <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {" "}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {pacientes.map( paciente => (
            <Pacientes
              paciente={paciente}
            />
          ))}
        </>
      ) : 
      (
        <>
          <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes {" "}
            <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
          </p>
        </>
      )}
    </>
  )
}

export default ListadoPacientes;