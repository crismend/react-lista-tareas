
import './App.css';
import FormularioTareas from './componentes/FormularioTareas';
import Header from './componentes/Header';
import { useState, useContext, useEffect } from 'react';
import ListaTareas from './componentes/listaTareas';
import { AuthContext } from './componentes/AuthContex';
import styled from 'styled-components';

const Boton = styled.button`
  width: 26%;
  height: 5.2vh;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 700;
  border: none;
  border-radius: 0.3em;
  background-image: linear-gradient(rgb(242, 243, 244), rgb(171, 178, 185));
  margin: 0.6rem;

  @media(max-width: 60rem){ /* 950px */
  width: 35%;
  height: 5.2vh;
  font-size: 0.9rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
	}
`

const App = () => {
  const { cerrarSesion } = useContext(AuthContext)

  const [tareas, cambiarTareas] = useState([]);


  // COMPROBAMOS SI MOSTRARCOMPLETADAS ES NULL
  let configMostrarCompletadas = '';
  if (localStorage.getItem('mostrarCompletadas') === null) {
    configMostrarCompletadas = true;
  } else {
    configMostrarCompletadas = localStorage.getItem('mostrarCompletadas') === 'true'
  }

  const [mostrarCompletadas, cambiarmostrarCompletadas] = useState(configMostrarCompletadas);
  useEffect(() => {
    //(tostring) porque el mostrarCompletadas es un boleano se convierte en CT con toString
    localStorage.setItem('mostrarCompletadas', mostrarCompletadas.toString())
  }, [mostrarCompletadas])


  const handleCerrarSesion = async () => {
    await cerrarSesion()
  }

  return (
    <div className='contenedor'>
      <Boton onClick={handleCerrarSesion}>Cerrar Sesion</Boton>
      <Header
        mostrarCompletadas={mostrarCompletadas}
        cambiarmostrarCompletadas={cambiarmostrarCompletadas}
      />
      <FormularioTareas />
      <ListaTareas tareas={tareas} cambiarTareas={cambiarTareas} mostrarCompletadas={mostrarCompletadas}
      />
    </div>
  );
}

export default App;
