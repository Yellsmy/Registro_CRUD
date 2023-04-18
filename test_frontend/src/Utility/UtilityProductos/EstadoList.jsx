import { Alert} from 'react-bootstrap'

export const EstadoList =(existencia)=>{
    let Variante = [
        'danger',
        'success'
      ];
    return (
    <Alert variant={Variante[existencia]} className="w-100 p-1 text-center alert-xs fw-bolder">
        {existencia === 0 && 'Inactivo'}
        {existencia === 1 && 'Activo'}
    </Alert>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    EstadoList
  };