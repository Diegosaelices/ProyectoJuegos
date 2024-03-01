import React from 'react';
import { BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom';
import Navigation from './navegacion/navegacion';
import Juego from './componentestresenraya/Tresenraya';
import Quiz from './componentesquiz/Quiz';
import Memoria from './componentesmemoria/Memoria';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        
        <Routes>
          <Route
            path="/componentestresenraya/Tresenraya"
            element={<Juego />}
            
           
          />
          <Route
            path="/componentesquiz/Quiz"
            element={<Quiz />}
           
          />
          <Route
            path="/componentesmemoria/Memoria"
            element={<Memoria />}
            
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



