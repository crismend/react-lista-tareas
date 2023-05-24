import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faEdit, faSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { format, fromUnixTime } from "date-fns";   //formatear fecha
import { es } from "date-fns/locale";
import styled from "styled-components";
import '../index.css';


const Tarea = ({ id, tarea, fecha, completada, toggleCompletada, dias }) => {
  //*estado para editar la tarea//
  const [editandoTarea, cambiarEditandoTarea] = useState(false);
  const [nuevaTarea, editandoNuevaTarea] = useState(tarea)

  const formatearFecha = (fecha) => {
    return (format(fromUnixTime(fecha),"dd 'de' MMMM 'de' yyyy", { locale: es }))
  }


  //? funcion para poder editar texto
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({nuevaTarea});

    try {
      await updateDoc(doc(db, 'tareas', id), {
        tarea: nuevaTarea
      });
    } catch (error) {
      console.log('error al actualizar la tarea');
      console.log(error);
    }
    cambiarEditandoTarea(false)
  }

  //eliminar
  const eliminarTarea = async (id) => {
    try {
      await deleteDoc(doc(db, 'tareas', id));
    } catch (error) {
      console.log('error al borrar la tarea la tarea');
      console.log(error);
    }
  }

// console.log(new Date())
// console.log(formatearFecha(fecha))

  return (
    <li className="lista-tareas__tarea">
      <FontAwesomeIcon
        icon={completada ? faCheckSquare : faSquare}
        className="lista-tareas__icono lista-tareas__icono-check"
        onClick={() => toggleCompletada(id)} //id para identificar la tarea por id
      />
      {/* texto de la tarea */}
      <div className="lista-tareas__texto">
        {editandoTarea ?
          <form action="" className="formulario-editar-tarea" onSubmit={handleSubmit}>
            <input
              type="text"
              className="formulario-editar-tarea__input"
              value={nuevaTarea}
              onChange={(e) => editandoNuevaTarea(e.target.value)} />
            <button
              type="submit"
              className="formulario-editar-tarea__btn">
              Actualizar
            </button>
          </form>
          :
          tarea
        }
        <ContenedorDias>
        <Fecha>{formatearFecha(fecha)}</Fecha>
        <Dias className={dias <= 3  ? 'item1' : dias <= 5 ? 'item2' : 'item3' }> {dias}  dias </Dias>
        </ContenedorDias>

        

      </div>

      {/* botones de editar y eliminar*/}
      <div className="lista-tareas__contenedor-botones">
        <FontAwesomeIcon
          icon={faEdit}
          className="lista-tareas__icono lista-tareas__icono-accion"
          onClick={() => cambiarEditandoTarea(!editandoTarea)}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className="lista-tareas__icono lista-tareas__icono-accion"
          onClick={() => eliminarTarea(id)}
        />
      </div>
    </li>
  )
}


const Dias = styled.div`
   font-size: 0.9rem;
  margin-left: 5px;
  padding: 0px 7px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content:center;
  border-width: 2px;
  border-style:outset;
  border-radius: 7px;

  @media (max-width: 50rem) { /* 80px */
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0px 5px;
    height: 2rem;
    margin-top: 5px;
    }
`

const Fecha = styled.div`
    width: 24vh;
    border-radius: 0.31rem; /* 5px */
    font-size: 0.9rem;
    background: #7592f3;
    text-align: center;
    color: #fff;
    padding: 0.2rem; /* 10px 50px */
    margin-top: 3px;
    margin-bottom: 3px;
    

    @media (max-width: 50rem) { /* 80px */
    width: 14vh;
    font-size: 0.7rem;
    padding: 0.2rem; /* 10px 50px */
    margin-top: 4px;
    margin-bottom: 4px;
    }
`;

const ContenedorDias = styled.div`
margin-top: 0.4rem;
  display: flex;

  
`


export default Tarea;