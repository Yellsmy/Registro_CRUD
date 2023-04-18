import { useRef } from "react";
import { useEffect } from "react";
function Tooltip({text, domRect}){

    let [position, setPosition] = useEffect({x:0, y:0});
    let tooltipElement = useRef();
    useEffect(()=>{
        let {width, height}= tooltipElement.current.getBoundingClientRect();
        let coords ={}
        if(domRect.y < height){
            coords.y = domRect.y + height
        }
        else{
            
        }
        setPosition({
            y: domRect.y - height,
            x: domRect.x + (domRect.width/2)-(width/2)
        })
    }, [domRect]);

    return(
        <span ref={tooltipElement} style={{left: position.x, top: position.y}} className="tooltip">{text}</span>
    )

}

export default Tooltip;