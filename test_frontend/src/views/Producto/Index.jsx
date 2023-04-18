import React, { useState, useEffect } from 'react';
import List from './List';
import Formulario from './Form'
import Select from 'react-select'
import ExportPDF from './Exports/ExportPDF';
import {GetRoute,PostRoute} from '../../Services/Private'

const Index = () => {
  const [allData, setAllData] = useState([]),
    [oneData, setOneData] = useState([]),
    [selectData, setSelectData] = useState([]),
    [opcion, setOpcion] = useState(0),
    // Obtiene varios registros
    All = async () => {
      //const response = await GetRoute('genero/all')
      const response = await fetch('https://localhost:5001/api/producto/all',
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
    )
        .then(function (data) {
            //StatusCode(data);
            return data.json()
        }).catch(function (data) {
            //StatusCode(data);
            return [];
        });
      setAllData((response.length > 0) ? response : []);;
    },
    // Obtiene un registro
    One = async (data, opcion) => {

      setOpcion(opcion)
      setOneData(data)

    },
    // Crea y actualiza un registro
    submitForm = async (data) => {

      setOpcion(0);
      var response = null;
      if (!data.id) {
        response = await PostRoute('producto/store', data)
      } else {
        response = await PostRoute('producto/update', data)
      }

      response.value === 1 && Refresh()

    },
    // Actualiza el estado de un registro
    setState = async (id_producto, existencia) => {
      setOpcion(0);
      var response = null;
      if (existencia === 1) {
        response = await PostRoute('producto/destroy', { id_producto })
      } else {
        response = await PostRoute('producto/active', { id_producto })
      }
      response.value === 1 && Refresh()
    },
    SelectRol = async () => {
      const response = await GetRoute('producto/label')
      setSelectData((response.length > 0) ? response : []);
    },

    Refresh = async () => {
      await All()
      await SelectRol()
    }

  useEffect(
    () => {
      const functionFetch = async () => {
        All()
        SelectRol()
      }
      functionFetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  )
  useEffect(() => {
    if (opcion === 1) {
      setOneData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opcion]);
  return (
    <>
      <div className="row">
        <div className="col  col-lg-11">
          {/* Titulos */}
          <h1>{'Componente de Producto implementacion CRUD'}</h1>
        </div>
        <div className="col col-lg-1">
          {/* Formulario */}
          <Formulario
            opcion={opcion}
            oneData={oneData}
            setOpcion={setOpcion}
            submitForm={submitForm}
          /> 
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* Sub Titulos */}
          {'Crear - Leer - Mostrar - Actualizar - Activar - Desactivar'}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ExportPDF nameFile={'EjemploPDF'} data={allData} />
        </div>
        <div className="col">
        </div>
        <div className="col">
        </div>
        <div className="col">
          {/* Seleccionable Ejemplo */}
          <Select
            isClearable
            defaultValue={null}
            options={selectData}
            placeholder={'seleccione opcion'}
            noOptionsMessage={() => 'sin resultados'}
            onBlur={event => event.preventDefault()} //resuelve el tener que dar doble click en movil
          />
        </div>
        </div>
      <div className="row">
        <div className="col">
          {/* Listado Ejemplo */}
          <List TipoP={allData} One={One} setState={setState} />
        </div>
        
      </div>
      
    </>
  );
}

export default Index; 