import React from "react";
import Tarea from "./Tarea";
import { db } from "../firebase";
import { collection, onSnapshot, updateDoc, doc, query, orderBy, where, limit } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from "./AuthContex";



const ListaTareas = ({ mostrarCompletadas, tareas, cambiarTareas }) => {

  const {userLogin} = useAuth();


  //! funcion para marcar completada o no 

  const toggleCompletada = async (id) => {
    const tarea = tareas.find(tarea => {
      if (tarea.id === id) {
        return tarea;
      }
    });
    if (tarea) {
     // console.log(tarea);
      try {
        await updateDoc(doc(db, 'tareas', tarea.id), {
          tarea: tarea.tarea,
          completada: !tarea.completada,
        });
      } catch (error) {
        console.log('error al actualizar la tarea');
        console.log(error);
      }
    }

    //---
    // cambiarTareas(tareas.map((tare) => {
    //   if (tare.id === id) {
    //     return { ...tare, completada: !tare.completada }
    //   }
    //   return tare;
    // }))
  }

    //!obteniendo las tareas por cada usuario
     useEffect(() => {
      //consulta por usuario
      const consulta = query(
        collection(db, 'tareas'),
        where('uidUsuario', '==', userLogin.uid ),
        orderBy('fecha', 'desc'),
        limit(20)
      );
  
      const unsuscribe =  onSnapshot(consulta, (snapshot) => {
        // console.log(snapshot.docs[1].data());
          const arregloTarea = snapshot.docs.map((documento) => {
            return { ...documento.data(), id: documento.id, completada: documento.data().completada, fecha: documento.data().fecha, dias: documento.data().dias }
          })
          cambiarTareas(arregloTarea);
        
      })
      return unsuscribe;
      
    }, [userLogin, cambiarTareas]) 

  //!obteniendo las tareas
/*   useEffect(() => {
    onSnapshot(
      collection(db, 'tareas'),
      (snapshop) => {
         console.log('se ejecuto snapshop');
         console.log(snapshop.docs[0].data());
        const arregloTarea = snapshop.docs.map((documento) => {
          return { ...documento.data(), id: documento.id, completada: documento.data().completada }
        })
        cambiarTareas(arregloTarea);
      }
    );
  }, []) */


  return (
    <ul className="lista-tareas">
      {
        tareas.length > 0 ? tareas.map((tare) => {
          if (mostrarCompletadas) {
            return <Tarea
              key={tare.id}
              id={tare.id}
              tarea={tare.tarea}
              fecha={tare.fecha}
              completada={tare.completada}
              toggleCompletada={toggleCompletada}
              dias={tare.dias}

            />
          } else if (!tare.completada) {
            return <Tarea
              key={tare.id}
              id={tare.id}
              tarea={tare.tarea}
              fecha={tare.fecha}
              completada={tare.completada}
              toggleCompletada={toggleCompletada}
              dias={tare.dias}
            />
          }
          return;

        }) : <div className="lista-tareas__mensaje">'no hay tareas para mostrar'</div>
      }
    </ul>
  )
}

export default ListaTareas;