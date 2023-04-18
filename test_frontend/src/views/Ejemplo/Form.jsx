import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import * as Icon from 'react-feather'

const Formulario = ({ opcion, oneData, setOpcion, submitForm }) => {
    const { register, handleSubmit, formState: { errors }, clearErrors, reset, setValue } = useForm(),
        [show, setShow] = useState(false),
        handleClose = () => {
            setOpcion(0);
            setShow(false);
            clearErrors()
            reset()
        },
        handleShow = () => {
            setShow(true);
        },
        setData = async () => {
            setValue('nombre', oneData.nombre)
            setValue('codigo', oneData.codigo)
        },
        onSubmit = (data) => {
            let jsData = {
                nombre: data.nombre,
                codigo: data.codigo,
                id: (oneData.id) ? oneData.id : null
            }
            submitForm(jsData)
            handleClose()
        }

    useEffect(() => {
        if (opcion > 0) {
            handleShow();
            if (opcion > 1) {
                setData();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opcion]);

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => setOpcion(1)}>
                <Icon.Plus size={16} /> {'Crear'}
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" centered keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-uppercase h1">
                        {'Formulario Ejemplo'}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Escriba un nombre'}</Form.Label>
                            <Form.Control
                                {...register('nombre',
                                    {
                                        required: true
                                    }
                                )
                                }
                                readOnly={opcion === 3}
                                isInvalid={!!errors.nombre}
                                autoComplete="off"
                            />
                            {errors?.nombre?.type === "required" && <p className="text-danger fw-danger">{"Este campo es requerido"}</p>}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" size="sm" onClick={() => handleClose()}>
                            <Icon.ArrowLeft size={16} /> {'Salir'}
                        </Button>
                        {
                            opcion !== 3 &&
                            <Button variant="success" size="sm" type="submit">
                                <Icon.Save size={16} /> {'Guardar'}
                            </Button>
                        }

                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Formulario;