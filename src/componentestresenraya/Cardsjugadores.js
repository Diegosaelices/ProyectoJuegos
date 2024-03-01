import React, { useState, useEffect } from 'react'; 
import * as API from '../services/Apijugadores'; 

const CardsUsuarios = ({ onUsuarioSeleccionado }) => { // Define un componente funcional llamado CardsUsuarios 

  // Define dos estados locales con useState: nombres y fotos, inicializados como arrays vacíos
  const [nombres, setNombres] = useState([]);
  const [fotos, setFotos] = useState([]);

  // Define un efecto con useEffect que se ejecuta una vez al montar el componente
  useEffect(() => {
    const fetchData = async () => { 
      try {
        const nombresData = await API.getNombres(); 
        const fotosData = await API.getFotos(); 
        setNombres(nombresData); 
        setFotos(fotosData); 
      } catch (error) { 
        console.error("Error al obtener datos de usuarios:", error); 
      }
    };

    fetchData(); 
  }, []); 

  return (
    <section className="flex flex-col items-center justify-center p-8"> 
      <h2 className="text-3xl font-bold mb-4">Selecciona 2 Usuarios</h2> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> 
        {nombres.map((nombre, index) => ( // Cada vez que se genera una tarjeta de usuario, se le asigna una key única utilizando el índice index.
          <div key={index} className="group bg-blue-400 rounded-md overflow-hidden shadow-md p-4 hover:bg-blue-600 transition duration-300">
            <img 
              src={fotos[index]} 
              alt={nombre} 
              className="w-full h-32 object-cover rounded-full mb-4" 
            />
            <p className="text-lg font-semibold">{nombre}</p> 
            <button 
              onClick={() => onUsuarioSeleccionado(nombre)} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-2" 
            >
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsUsuarios; 
