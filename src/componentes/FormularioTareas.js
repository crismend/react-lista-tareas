import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "./AuthContex";
import DatePick from "./DatePicker";
import getUnixTime from 'date-fns/getUnixTime'                 

const FormularioTareas = () => {

  const [inputTarea, manejarInputTarea] = useState('');
  const [fecha, setFecha] = useState(new Date())
  const { userLogin } = useAuth();

  const handleInput = (e) => {
    manejarInputTarea(e.target.value)
  }

  const diferencia = () => {
    const targetDate = fecha;
    const toDay = new Date();
    const difference = targetDate - toDay.getTime();     //.getTime()devuelve el tiempo en un numero
    const days = Math.ceil(difference / (1000 * 3600 * 24));       
    return days;
  }
  console.log(diferencia())


  //!enviar los datos a firestore
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(userLogin)
    try {
      await addDoc(collection(db, 'tareas'), {
        tarea: inputTarea,
        completada: false,
        fecha: getUnixTime(fecha),
        uidUsuario: userLogin.uid,
        dias: diferencia()

      });
    } catch (error) {
      console.log('error de cargue');
      console.log(error);
    }
    manejarInputTarea('');                                     //luego de enviar el form deja el placeHolder nuevamente en blanco
    setFecha(new Date());
  }


  return (
    <form className="formulario-tareas" onSubmit={handleSubmit}>
      <input
        type="text"
        className="formulario-tareas__input"
        placeholder="Escribe una tarea"
        value={inputTarea}
        onChange={(e) => handleInput(e)}
      />
<div className="pickAndButton">
      <DatePick fecha={fecha} setFecha={setFecha} />

      <button type="submit"  className="formulario-tareas__btn" >
        <FontAwesomeIcon icon={faPlus} className="formulario-tareas__icono-btn" />
        
      </button> 
      </div>

    </form>
  )
}

export default FormularioTareas;