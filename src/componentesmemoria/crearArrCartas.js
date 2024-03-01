// Importa el módulo "data" desde el archivo Api.js ubicado en el mismo directorio.
import data from "../services/Api";

// Función que crea un array de cartas basado en un número proporcionado.
export default function crearArrCartas(numCards) {
   
    const numEquipos = data.equipos.length;
    
    const indicesAleatorios = [];

    // Generar índices aleatorios únicos para representar cartas.
    while (indicesAleatorios.length < numCards) {
        
        const randomIndex = Math.floor(Math.random() * numEquipos);
       
        if (!indicesAleatorios.includes(randomIndex)) {
            
            indicesAleatorios.push(randomIndex);
            indicesAleatorios.push(randomIndex);
        }
    }

    // Baraja los índices aleatorios utilizando el algoritmo de Fisher-Yates.
    for (let i = indicesAleatorios.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indicesAleatorios[i], indicesAleatorios[j]] = [indicesAleatorios[j], indicesAleatorios[i]];
    }

    // Crea un array de objetos que representan cartas utilizando los índices aleatorios.
    const arr = indicesAleatorios.map((index, cardId) => ({
        id: cardId,
        symbol: data.equipos[index].imagen, 
        bind: index, 
        rotate: false, 
        validating: 0,
        pinUp: 0
    }));

    return arr; 
}
