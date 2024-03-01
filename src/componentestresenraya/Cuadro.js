import React from 'react';
import '../styles/Cuadro.css'; 
import classNames from 'classnames'; 

const Cuadro = ({ valor, onClick, turno, ganador }) => { 

   
    const manejarClick = () => {
        
        (turno !== null && valor === null) && onClick();
    }

    let claseCuadro = classNames({
        cuadro: true, 
        [`cuadro--${valor}`]: valor !== null, 
        ganador: ganador, 
    });

    // Renderiza el componente Cuadro
    return (
        <div className={claseCuadro} onClick={() => manejarClick()}>
        </div>
    )
}

export default Cuadro; 
