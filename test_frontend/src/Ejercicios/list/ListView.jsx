
// Este componente es de presentación
function ListView({elements, funcFilterItems}){
    return(
        <div>
            {/*ev.target.value es el patrón actual o la letra que se esta escribiendo en el input actualmente */}
            <input type="text" onChange={ev => funcFilterItems(ev.target.value)} />
            <ul>
                {
                    elements.map((nombre, index) => nombre && <li key={index}>{nombre}</li>)
                }
            </ul>       
        </div>
    )

}

export default ListView;