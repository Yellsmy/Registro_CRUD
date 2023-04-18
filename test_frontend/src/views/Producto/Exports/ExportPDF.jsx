import { useState, Fragment } from 'react'
import { Button , Modal} from 'react-bootstrap'
import { generatePDF } from "../../../Template/PdfPortrait";
import * as Icon from 'react-feather'

export const ExportPDF = (props) => {

    const ModalPdf = ({toggle, modal, titulo, pdf}) => {
        return (
          <Modal
            show={modal}
            onHide={toggle}
            backdrop='static'
            centered
            size="lg"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <span className='h1 fw-bolder'>{titulo && titulo}</span>
            </Modal.Header>
            <Modal.Body>
              <object
                className='Visor'
                width='100%'
                height='600'
                id='pdf-ficha'
                aria-labelledby='perfil'
                type='application/pdf'
                data={`${pdf}`}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' size='sm' onClick={() => toggle(false)}>
                <Icon.ArrowLeft size={16} /> {'Salir'}
              </Button>
              <a className='btn btn-danger btn-sm' download='Reporte.pdf' href={`${pdf}`}>
                <Icon.Download size={16} /> {'Descargar'}
              </a>
            </Modal.Footer>
          </Modal>
        )
      }

    const [show, setShow] = useState(false),
        [pdf, setPdf] = useState([]),

        showModal = async () => {

            let response = props.data
                //el cuerpo del documento en tabla
                , columns = [['No.', "Nombre", "Estado"]], rows = [];
            await response.map((item, i) => (
                rows[i] = [i + 1, item.nombre, (item.estado === 1) ? "Activo" : "Inactivo"]
            ));
            const doc = await generatePDF(
                rows, //filas
                columns, //columnas
                "Listado", // titulo 
                "Ejemplo", //sub titulo
                props.nameFile, //nombre pdf
                '',
                [],
                'Lilibeth'
            )
            await setShow(true)
            await setPdf(doc)
        }

    return (
        <Fragment>
            <Button className="btn " variant="danger"  onClick={() => showModal()}>
                <Icon.File size={16} /> 
            </Button>
            
            <ModalPdf
                modal={show}
                toggle={setShow}
                titulo={"Visualizar"}
                pdf={pdf}
            />
        </Fragment>
    )
}
export default ExportPDF