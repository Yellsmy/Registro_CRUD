import { useRef, useState } from "react";
import Tooltip from "./Tooltip";


function TooltipText(props){
    
    let [tooltipDomRect, setTooltipDomRect] = useState();
    let [showTooltip, setShowTooltip] = useState(false);
    
    // El elemento que obtiene useRef se conserva incluso si el componente se actualizó
    let spanElement=useRef();
    
    // Función para obtener el ancho y alto del elemento que retorna este componente
    function handleMouseOver(){
        let domData = spanElement.current.getBoundingClientReact();
        setTooltipDomRect(domData);
        setShowTooltip(true);
    }
    return(<>       
        <span className="tooltip-text" ref={spanElement} onMouseLeave={ev=> setShowTooltip(false)} onMouseOver={ev=> handleMouseOver(ev)}>
            {/*props.children: nos entrega un arreglo que con todos los elementos personalizados */}
            {props.children}      
        </span>
        {/*El tooltip solo se mostrará si showTooltip es verdadera */}
        {     
            showTooltip && <Tooltip domRect={tooltipDomRect} text={props.tooltip}/> 
        }     
        </>)

}

export default TooltipText;