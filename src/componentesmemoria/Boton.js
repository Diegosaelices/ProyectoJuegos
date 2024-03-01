// Esta es una función de componente de React que exporta un botón personalizado.
// Toma props como argumento que contiene propiedades: action y label.
export default function Boton(props) {
    return (
       
        <button className='button' onClick={props.action}>{props.label}</button>
       
    );
}
