import React, { useState } from 'react'; 
import Tablero from './Tablero';
import Marcador from './Marcador'; 
import CardsUsuarios from './Cardsjugadores'; 

// Define las posiciones ganadoras en el Tres en Raya
const posicionesGanadoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Juego = () => {
  const [jugadorX, setJugadorX] = useState(null); // Estado para el jugador X
  const [jugadorO, setJugadorO] = useState(null); // Estado para el jugador O
  const [turno, setTurno] = useState('O'); // Estado para el turno actual
  const [cuadros, setCuadros] = useState(Array(9).fill(null)); // Estado para los cuadros del tablero
  const [cuadrosGanadores, setCuadrosGanadores] = useState([]); // Estado para las posiciones de los cuadros ganadores
  const [puntuacion, setPuntuacion] = useState({ // Estado para la puntuación de los jugadores
    X: 0,
    O: 0,
  });
 // const [nombreTurno, setNombreTurno] = useState(''); // Estado para el nombre del jugador en turno

  // Función para reiniciar el juego
  const reiniciar = () => {
    setTurno('O');
    setCuadros(Array(9).fill(null)); // los pone a null
    setCuadrosGanadores([]);  // limpipa la liena ganadora
  
  };

  // Función para verificar si hay un ganador o empate
  const verificarGanador = (nuevosCuadros) => {
    for (let i = 0; i < posicionesGanadoras.length; i++) {
      const [a, b, c] = posicionesGanadoras[i];
      if (
        nuevosCuadros[a] &&
        nuevosCuadros[a] === nuevosCuadros[b] &&
        nuevosCuadros[a] === nuevosCuadros[c]
      ) {
        finalizarJuego(nuevosCuadros[a], posicionesGanadoras[i]);
        return;
      }
    }
    // aqui verifica empate

    if (!nuevosCuadros.includes(null)) {
      finalizarJuego(null, Array.from(Array(9).keys()));
      return;
    }
    setTurno(prevTurno => (prevTurno === 'X' ? 'O' : 'X'));
  };

  // Función para manejar el clic en un cuadro del tablero
  const handleClick = (cuadro) => {
    if (turno && !cuadros[cuadro]) { // que haya valor en turno y que el cuadro este vacio 
      let nuevosCuadros = [...cuadros];//Esto se hace para no modificar directamente el array original y seguir el principio de inmutabilidad en React.
      nuevosCuadros[cuadro] = turno;  // actualiza el array
      setCuadros(nuevosCuadros);  // actualiza el estado de los cuadros con la copia modificada y lo renderiza
      verificarGanador(nuevosCuadros); // aqui llama ala funcion y verifica si gana o no
    }
  };

  // Función para finalizar el juego
  const finalizarJuego = (resultado, posicionesGanadoras) => {
    setTurno(null);
    if (resultado !== null) {  // si hay ganador y actualizamos es estado de puntuacion
      setPuntuacion({
        ...puntuacion,//copiar el estado actual de puntuacion , otro operador de propagacion
        [resultado]: puntuacion[resultado] + 1, // y aqui lo actualiza
      });
    }
    setCuadrosGanadores(posicionesGanadoras);
    setTimeout(reiniciar, 1000);
  };

  // Función para manejar la selección de usuarios
  const handleUsuarioSeleccionado = (usuario) => {
    if (!jugadorX) {
      setJugadorX(usuario);
      setTurno(usuario); // Establece el turno al seleccionar el primer jugador
      
    } else if (!jugadorO && jugadorX !== usuario) {
      setJugadorO(usuario);
    
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white p-8">
      {(!jugadorX || !jugadorO) ? ( // Si no se han seleccionado ambos jugadores, muestra la selección de usuarios
        <CardsUsuarios onUsuarioSeleccionado={handleUsuarioSeleccionado} />
      ) : ( // Si se han seleccionado ambos jugadores, muestra el tablero y el marcador
        <>
          <Tablero
            cuadrosGanadores={cuadrosGanadores}
            turno={turno}
            cuadros={cuadros}
            onClick={handleClick}
          />
          <Marcador
            puntuacionO={puntuacion.O}
            puntuacionX={puntuacion.X}
            nombreJugadorO={jugadorO}
            nombreJugadorX={jugadorX}
          />
        </>
      )}
    </div>
  );
};

export default Juego; // Exporta el componente Juego













