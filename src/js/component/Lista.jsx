import React, { useState, useEffect } from "react";
import Footer from "./Footer.jsx";

const Lista = () => {
  // Estados declarados
  const [tarea, setTarea] = useState(""); // Estado para almacenar la tarea actual
  const [list, setList] = useState([]); // Estado para almacenar la lista de tareas
  const urlJh = 'https://playground.4geeks.com/apis/fake/todos/user/jegd';
  const counter = list.length


  async function crearUsuario() {
    try {
      const response = await fetch(urlJh, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([]),
      });
      const data = await response.json();
      console.log(data.msg);
      // Si el usuario existe, obtiene las tareas
      if (data.msg === "The user exist") {
        obtenerTareas();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Función para obtener las tareas desde la API
  async function obtenerTareas() {
    try {
      const response = await fetch(urlJh);
      const data = await response.json();
      setList(data); // Actualiza el estado con las tareas obtenidas
    } catch (error) {
      console.log(error);
    }
  }

  // Función para actualizar las tareas en la API
  async function actualizarTarea(updatedList) {
    try {
      const response = await fetch(urlJh, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedList), // Envía la lista actualizada 
      });
      if (response.status === 200) {
        obtenerTareas(); // Si la actualización fue exitosa, obtiene las tareas actualizadas
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // Se ejecuta al cargar el componente
  useEffect(() => {
    crearUsuario(); // Crea el usuario al cargar la página
  }, []);

  // Añade una tarea al presionar Enter
  const añadeTareas = (e) =>  {
    if (e.key === "Enter") {
      const newTask = { label: tarea, done: false };
      const updatedList = [...list, newTask]; // Crea una nueva lista con la tarea añadida
      setList(updatedList); // Actualiza el estado de la lista
      setTarea(""); // Limpia el campo de entrada
      actualizarTarea(updatedList); // Actualiza las tareas en la API
    }
  };

  // Maneja la eliminación de tareas
  const handleDelete = (index) => {
    const updatedList = list.filter((_, currentIndex) => index !== currentIndex);
    setList(updatedList); // Actualiza el estado de la lista
    actualizarTarea(updatedList); // Actualiza las tareas en la API
  };

  const removeAll =  () => {
    setList([]); // Actualizar el estado con la nueva lista vacía
    actualizarTarea(list); // Actualizar la nueva lista vacía en la API
  };


  return (
    <div className="container mt-4 ">
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded pt-1">
          <h1 className="text-center mt-5 fs-1">todos</h1>
          <div className="container-fluid z-3 text-center position-relative mb-2 border-opacity-50 px-0  ">
            <input
              type="text"
              className="form-control border-bottom py-2 border-opacity-75 fs-4"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
              onKeyDown={añadeTareas} 
              placeholder='What needs to be done?'
            />
          </div>
          <ul className="list-group px-0 pt-0 pb-0 py-2 w-100 ">
            {list.map((item, index) => (
              <> 
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center rounded">
                {item.label}
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => handleDelete(index)} // Llama a handleDelete al hacer clic en el botón
                ></button>
              </li>         
              </>
              
              ))}

              <Footer
                counter={counter} 
                actualizarTarea={actualizarTarea}
                list={list}
                setList={setList}
                removeAll={removeAll}
              />
              
          </ul>
            
        </div>
      </div>
    
  );
};

export default Lista;
