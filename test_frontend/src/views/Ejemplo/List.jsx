import React,{ Fragment} from 'react';
import DataTable from 'react-data-table-component';
import * as Icon from 'react-feather';
import {EstadoLista} from '../../Utility/EstadoLista';

const List = ({TipoP,One,setState}) => {

    const columns = [
        {
            name: 'Nombre del Registro',
            selector: row => row.nombre,
            center: true,
            sortable: true,
        },
        {
            name: 'estado',
            center: true,
            cell: (row) => EstadoLista(row.estado)
        },
        {
            name: 'Acciones',
            center: true,
            cell: (row) =>
                <>
                        <span className='btn btn-sm' onClick={() => One(row, 3)}><Icon.Eye size={14} className="mx-2 text-info" />{'Visualizar'}</span>
                        {row.estado === 1 ?
                            <span className='btn  btn-sm' onClick={() => One(row, 2)}><Icon.Edit size={14} className="mx-2 text-primary" /> {"Acutalizar"}</span>
                            : null}
                        <span className='btn btn-sm' onClick={() => setState(row.id, row.estado)}>
                            {row.estado === 1 ?
                                <Fragment>
                                    <Icon.Slash size={14} className="mx-2 text-danger" /> {'Desactivar'}
                                </Fragment> :
                                <Fragment>
                                    <Icon.Check size={14} className="mx-2 text-success" /> {'Activar'}
                                </Fragment>
                            }
                        </span>
                    </>
        },
    ]

  return (
    <div >
      <DataTable
      
        columns={columns}
        data={TipoP}
        className='table-responsive'
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        paginationComponentOptions={
            {
                rowsPerPageText: 'Filas por página:',
                rangeSeparatorText: 'de'
            }
        }
        noDataComponent={'No hay datos para mostrar'}
        />
    </div>
  );
}

export default List;