import React from 'react'; 
import Cuadro from './Cuadro'; 

const Tablero = ({ cuadros, onClick, turno, cuadrosGanadores }) => {
  // Función para crear los cuadros del tablero a partir de un array de valores
  const crearCuadros = (valores) =>
    valores.map((valor) => (  
      <Cuadro
        ganador={cuadrosGanadores.includes(valor)} 
        turno={turno} 
        onClick={() => onClick(valor)} 
        valor={cuadros[valor]} 
        key={`cuadro_${valor}`} 
      />
    ));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">¡Tres en Raya!</h2>
      <div className="grid grid-cols-3 gap-2"> 
        <div className="grid grid-rows-3"> 
          {crearCuadros([0, 1, 2])} {/* Crea los cuadros para los valores 0, 1 y 2 */}
        </div>
        <div className="grid grid-rows-3"> 
          {crearCuadros([3, 4, 5])} {/* Crea los cuadros para los valores 3, 4 y 5 */}
        </div>
        <div className="grid grid-rows-3">
          {crearCuadros([6, 7, 8])} {/* Crea los cuadros para los valores 6, 7 y 8 */}
        </div>
      </div>
    </div>
  );
};

export default Tablero; 
