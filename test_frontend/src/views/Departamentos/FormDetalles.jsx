import { Button, Modal, Form } from "react-bootstrap"
import * as Icon from 'react-feather';

const Formulario = ({register, show, handleSubmit, onSubmit, handleClose, opcion}) => {
    
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" centered keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-uppercase h1">
                        {'Detalles de Registro'}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Nombre'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('nombre',
                                    {
                                        required: false
                                    }
                                )
                                }
                                readOnly={opcion === 3}
                            />                          
                        </Form.Group>

                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Código Postal'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('cod_postal',
                                    {
                                        required: false
                                    }
                                )
                                }
                                readOnly={opcion === 3}
                            />                      
                        </Form.Group>

                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Estado'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('estado',
                                    {
                                        required: false
                                    }
                                )
                                }
                                readOnly={opcion === 3}
                            />                      
                        </Form.Group>

                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Creado por'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('creado_por',
                                    {
                                        required: false
                                    }
                                )
                                }
                                readOnly={opcion === 3}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Fecha de creación'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('creado',
                                    {
                                        required: false
                                    }
                                )
                                }
                                readOnly={opcion === 3}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Última actualización por'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('actualizado_por',
                                    {
                                        required: false
                                    }
                                )
                                }
                                readOnly={opcion === 3}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Fecha de última actualización'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('actualizado',
                                    {
                                        required: false
                                    }
                                )
                                }
                                readOnly={opcion === 3}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" size="sm" onClick={() => handleClose()}>
                            <Icon.ArrowLeft size={16} /> {'Salir'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
    
}
export default Formulario;