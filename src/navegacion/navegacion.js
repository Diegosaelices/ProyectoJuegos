

import React from 'react';
import '../styles/Navigation.css';

function Navigation() {
  return (
    <div className="navigation-container">
      <h1 className="navigation-title">BrainGames</h1>
      <div className="button-container">
        <button
          onClick={() => (window.location.href = '/componentestresenraya/Tresenraya')}
          className="navigation-button button-tresenraya"
        >
          TRES EN RAYA
        </button>
        <button
          onClick={() => (window.location.href = '/componentesquiz/Quiz')}
          className="navigation-button button-quiz"
        >
          JUEGO HIGHER LOWER
        </button>
        <button
          onClick={() => (window.location.href = '/componentesmemoria/Memoria')}
          className="navigation-button button-memoria"
        >
          JUEGO DE MEMORIA
        </button>
      </div>
    </div>
  );
}

export default Navigation;
