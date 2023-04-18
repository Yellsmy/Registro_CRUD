
import { Alert} from 'react-bootstrap'

export const EstadoLista =(estado)=>{
    let Variante = [
        'danger',
        'success'
      ];
    return (
    <Alert variant={Variante[estado]} className="w-100 p-1 text-center alert-xs fw-bolder">
        {estado === 0 && 'Inactivo'}
        {estado === 1 && 'Activo'}
    </Alert>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    EstadoLista,
  };