import imgAvatar from './assets/logo.png'
import './diseño.css'
function PresentationCard(){
    let name = 'Lily'
    return(
        <>
        <div className="presentation-card">
            <img src={imgAvatar} alt="Avatar" className="avatar"/>
            <h1>Hola, soy {name} y estoy usando React</h1>
        
      </div>
      
    </>
    )

}

export default PresentationCard;