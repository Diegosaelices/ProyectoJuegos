// Importa los módulos necesarios desde React y otros componentes locales.
import React, { useEffect, useState } from 'react';
import Boton from './Boton'; 
import Carta from './Carta'; 
import convertirTiempo from './convertirTiempo'; 
import crearArrCartas from './crearArrCartas'; 

// Define el componente PantallaJuego que representa la pantalla del juego de memoria.
export default function PantallaJuego(props) {
  // VARIABLES DE ESTADO
  const [cardsArr, setCardsArr] = useState([]);
  const [moves, setMoves] = useState(0);

  // GENERAR TARJETAS ALEATORIAS INICIALES
  useEffect(() => {
    // Utiliza useEffect para generar el array de cartas aleatorias cuando cambia el número de cartas.
    setCardsArr(crearArrCartas(props.numCards)); 
  }, [props.numCards]); 

  // FUNCION: ROTAR
  const rotate = (id, pinUp) => {
    if (pinUp === 0) {
   
      setCardsArr(prevArr => {
        prevArr[id].rotate = true; 
        prevArr[id].validating = 1; 
        return [...prevArr]; 
      });
      setTimeout(() => validar(), 500); 
    }
  };

  // FUNCION: VALIDAR
  const validar = () => {
    // Función para validar si las cartas son iguales o no.
    setMoves(moves + 1); 

   
    const validatingCards = cardsArr.filter(card => card.validating === 1);

    if (validatingCards.length === 2) {
      // Si hay dos cartas en proceso de validación...
      if (validatingCards[0].bind !== validatingCards[1].bind) {
        
        setTimeout(() => {
          setCardsArr(prevArr => {
            prevArr[validatingCards[0].id].rotate = false; 
            prevArr[validatingCards[0].id].validating = 0; 
            prevArr[validatingCards[1].id].rotate = false;
            prevArr[validatingCards[1].id].validating = 0; 
            return [...prevArr]; 
          });
        }, 500);
      } else {
        // Si las cartas son iguales, se les marca como descubiertas.
        setCardsArr(prevArr => {
          prevArr[validatingCards[0].id].pinUp = 1; 
          prevArr[validatingCards[0].id].validating = 0;
          prevArr[validatingCards[1].id].pinUp = 1; 
          prevArr[validatingCards[1].id].validating = 0;
          return [...prevArr]; 
        });
      }
    }

    // Verifica si todas las cartas han sido descubiertas.
    const allCardsFlipped = cardsArr.every(card => card.pinUp === 1);
    if (allCardsFlipped) {
      props.setFinish(2); 
    }
  };

  return (
    // Renderiza la pantalla del juego con los siguientes elementos:
    <div className='gamescreen'>
      <div className='gamescreen--score grid grid-2'>
      
        <div className='gamescreen--moves'>
          <p>Movimientos: {moves}</p>
        </div>
       
        <div className='gamescreen--time text-right'>
          <p>Tiempo: {convertirTiempo(props.time)}</p>
        </div>
      </div>
      {/* Renderiza las cartas del juego. */}
      <div className='gamescreen--cards grid grid-4'>
        {cardsArr
          .sort((a, b) => a.id - b.id) // Ordena las cartas por su identificador.
          .map(card => (
            <Carta
              key={card.id}
              id={card.id}
              rotate={card.rotate}
              symbol={card.pinUp ? card.symbol : card.symbol}
              pinUp={card.pinUp}
              bind={card.bind}
              actionRotate={rotate} 
            />
          ))}
      </div>
      {/* Renderiza un botón para reiniciar el juego. */}
      <div className='text-center'>
        <Boton label="Reiniciar juego" action={props.setRestart} />
      </div>
    </div>
  );
}
