// Importa el hook useState de React, así como otros componentes necesarios.
import { useState } from "react";
import PantallaPrincipal from "./PantallaPrincipal"; 
import '../componentesmemoria/styles/sylesmemoria.css'; 
import PantallaJuego from "./PantallaJuego"; 
import PantallaFinal from "./PantallaFinal"; 

// Función componente Memoria que representa el juego de memoria.
function Memoria() {
  // VARIABLES DE ESTADO
  const [stateGame, setStateGame] = useState(0); // Estado del juego (0: no iniciado, 1: en proceso, 2: finalizado).
  const [level, setLevel] = useState(0);

  // OBJETO CON NUMERO DE CARTAS, SEGUN NIVEL
  const cardsByLevel = {
    0: 8,
    1: 16,
    2: 24
  };

  // CAMBIAR DIFICULTAD
  const changeDifficulty = () => {
    setLevel(level === 2 ? 0 : level + 1); 
  };

  // CAMBIAR EL ESTADO DE JUEGO
  const changeStateGame = (value) => {
    setStateGame(value); 
    if (value === 1) playTimer(); 
  };

  // REINICIAR EL JUEGO
  const restartGame = () => {
    setStateGame(0); 
    setLevel(0); 
    resetTimer(); 
  };

  // CONTADOR DE TIEMPO
  const [intervalId, setIntervalId] = useState(0); 
  const [mainMiliseconds, setMainMiliseconds] = useState(0); 

  const playTimer = () => {
    // Función para iniciar el contador de tiempo.
    if (intervalId) {
      clearInterval(intervalId); 
      setIntervalId(0);
    }

    // Crea un nuevo intervalo de tiempo para actualizar el tiempo transcurrido cada segundo.
    const newIntervalId = setInterval(() => {
      setMainMiliseconds((mainMiliseconds) => mainMiliseconds + 1000); 
    }, 1000);

    setIntervalId(newIntervalId); 
  };

  const resetTimer = () => {
    // Función para reiniciar el contador de tiempo.
    setMainMiliseconds(0); 
    if (intervalId) {
      clearInterval(intervalId); 
      setIntervalId(0);
    }
  };

  return (
    // Renderiza el contenido del juego dependiendo del estado actual del juego.
    <div className="container middle">
      {stateGame === 0 ? ( // Si el juego no ha iniciado, muestra la pantalla principal.
        <PantallaPrincipal
          setStart={changeStateGame} 
          level={level} 
          changeDifficulty={changeDifficulty} 
        />
      ) : stateGame === 1 ? (
        <PantallaJuego
          numCards={cardsByLevel[level]} 
          setRestart={restartGame}
          setFinish={changeStateGame} 
          time={mainMiliseconds} 
        />
      ) : ( 
        <PantallaFinal setRestart={restartGame} /> 
      )}
    </div>
  );
}

export default Memoria; 
