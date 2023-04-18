import TooltipText from "./tooltip/TooltipText";


function Ejercicio06(){
    return(
        <div className="App">
            <p><TooltipText tooltip={"Texto generado"}>Lorem ipsum</TooltipText>dolor sit amet, consectetur adipiscing elit. sed ille, ut, dixi, vitiose, Scrupulu</p>
            <p>Si longus, levis dictata sunt. De quibus cupio scire quid sentias. Eam tum adesse. cum dolor omnis absit; Et ille ridens: Video, inquit, quid agas</p>
            <p>Videsne quam sit magna dissensio? quod quidem iam fit etiam in <TooltipText tooltip={"Soy un tooltip"}>Academia</TooltipText>. Respondeat totiden v</p>       
        </div>      
        
    )

}

export default Ejercicio06;