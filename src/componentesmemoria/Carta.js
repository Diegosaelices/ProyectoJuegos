import React from 'react';
import '../componentesmemoria/styles/sylesmemoria.css';

// Definición del componente "Carta" que representa una carta en el juego de memoria.
export default function Carta(props) {
  return (
    <div 
      // Se establecen las clases CSS dinámicamente utilizando template literals.
     
      className={`card ${props.rotate ? 'rotate' : ''}`}
      // Se establece el atributo data-id con el valor de props.id, que es una identificación única para esta carta.
      data-id={props.id} 
      
      onClick={() => props.actionRotate(props.id, props.pinUp)} 
     
    >
      {/* Este es el contenedor interno de la carta, que contiene tanto la parte frontal como la trasera de la carta. */}
      <div className='card--inner'>
        
        {props.rotate ? (
         
          <React.Fragment>
          
            <div className='card--front middle'>
              <img src={props.symbol} alt="Card Symbol" />
            </div>
           
            <div className='card--back middle'>
              <img src={props.symbol} alt="Card Symbol" />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
}
