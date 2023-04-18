import { useState } from 'react';
import frameworksList from './items'
import ListView from './ListView';

/* Componentes de presentacion = Tiene la responsabilidad de mostrar los datos
 y los componentes contenedores= tienen la funcion de procesar información y cintenerla*/

 // Este componente es contenedor
 function List(){
    let [items, setItems]= useState(frameworksList);
    
    /* Evalúa si los filtros están vacíos, es decir, si hay una palabra de busqueda
     sino llama a otra función.
     @param searchPattern: es la palabra a buscar*/
    function filterItems(searchPattern){

        // Si todavía no hay una palabra para buscar, retorna la lista completa
        if(searchPattern ===""){
            setItems(frameworksList);
        }
        else{
           let newItems = filterItemsBySearchPattern(searchPattern);
           setItems(newItems);
        }
    }

    // Función para hacer la filtración 
    function filterItemsBySearchPattern(searchPattern){
        /* Se filtran los elementos del arreglo. cada elemento del arreglo se convierte
         en minúsculas (item.toLowerCase()) y evaluamos si el elemento incluye el patrón de
         búsqueda el cual también se convierte en minúscula (includes(serachPattern.toLowerCase()))
         ? item:null operador ternario, retorna solos los items que sean diferentes a null
         */
        let filterItems = frameworksList
                            .map( item => item.toLowerCase().includes(searchPattern.toLowerCase()) ? item:null);     
        return filterItems;
    }
    return(
        <>
        <div className="">
            {/*elements es una props. Los props son datos de propiedades que se envian de los
            componentes padres a los componentes hijos. En este caso List es el padre*/}
            <ListView elements={items} funcFilterItems={filterItems}/>       
        </div>      
        </>
    )

}

export default List;