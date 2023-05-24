import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';


const Header = ({ mostrarCompletadas, cambiarmostrarCompletadas }) => {

    const toggleCompletada = () => {
      cambiarmostrarCompletadas(!mostrarCompletadas)
    }

  return (
    <header className="header">
      <h1 className="header__titulo">Lista de tareas</h1>
      {mostrarCompletadas ?
        <button
          className="header__boton"
          onClick={() => toggleCompletada()}
        >
          No mostrar completadas
          <FontAwesomeIcon className="header__icono-boton" icon={faEyeSlash} />
        </button>
        :
        <button
          className="header__boton"
          onClick={() => toggleCompletada()}
        >
          Mostrar completadas
          <FontAwesomeIcon className="header__icono-boton" icon={faEye} />
        </button>
      }
    </header>
  )
}

export default Header; 