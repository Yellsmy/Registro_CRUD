import { useState, useEffect } from "react";
function Countdown(){
    // Segundos objetivo 
    let [targetSeconds, setTargetSeconds] = useState(null);
    // segundos recorridos
    let [elapsedSeconds, setElapsedSeconds] = useState(0);
    
    // useEffect permite ejecutar funciones con efectos secundarios
    // como setInterval()
    //useEffect(function(), [lista de dependencias])
    useEffect(function(){
        // Si no se ha indicado los segundos objeivo, sale
        if(targetSeconds === null) return;

        // Si se conocen los segundos objetivos
        setElapsedSeconds(0);
        // Almacena la funcion de intervalo para limpiarla posteriormente
        /*Funcion setInterval()= permite actualizar los segundos en 1 cada vez
         que transcurren*/
        let interval = setInterval(function(){
            setElapsedSeconds((elapsedSeconds)=> elapsedSeconds+1)
        },1000);

        // Se retorna para desmontar el componene y hacer limpieza
        return()=>{
            // se limpia el interval cuando el componente lo requiera
            clearInterval(interval);
        }
    },[targetSeconds]   
    );

    function parseForm(ev){
        ev.preventDefault();
        let seconds = ev.target.seconds.value;
        setTargetSeconds(parseInt(seconds));
    }

    if(elapsedSeconds >= targetSeconds && targetSeconds !== null){
        return(
            <>
                <p>Finalizado con éxito</p>
                <button onClick={()=>setTargetSeconds(null)}>Reiniciar</button>
            </>
        )
    };

    if(targetSeconds !== null){
        return(
            <p>Faltan {targetSeconds-elapsedSeconds} segundos</p> 
        )
    };
    
    return(
        <>
            <p>¿Cuántos segundos quieres contar?</p>
            <form action="g" onSubmit={ev=>parseForm(ev)}>
                <input type="number" name="seconds"/>
                <button>Iniciar</button>
            </form>
        </>
    )

}

export default Countdown;