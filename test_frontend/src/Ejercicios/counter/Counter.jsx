import { useState } from "react";

function Counter(){
    // Manejo de estado
    //const [valorUno, setValorUno]=useState(valorInicial);
    const [contador, setContador]=useState(0);
    return(
        <div className="">
            <p>Haz hecho clic {contador} veces a este botón</p>
            <button onClick={() =>{setContador(contador+1)} }>Incrementar</button>
        </div>
      
    )

}

export default Counter;