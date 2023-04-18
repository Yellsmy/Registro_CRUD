import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import * as Icon from 'react-feather';
import FormDetalles from './FormDetalles';

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
            setValue('cod_postal', oneData.cod_postal)
            setValue('estado', oneData.estado)
            setValue('creado', oneData.creado)
            setValue('creado_por', oneData.creado_por)
            setValue('actualizado', oneData.actualizado)
            setValue('actualizado_por', oneData.actualizado_por)
        },
        onSubmit = (data) => {
            let jsData = {
                nombre: data.nombre,
                cod_postal: data.cod_postal,
                estado: data.estado,
                creado: data.creado,
                creado_por: data.creado_por,
                actualizado: data.actualizado,
                actualizado_por: data.actualizado_por,
                id: (oneData.id) ? oneData.id : null
            }
            console.log(jsData)
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

    if(opcion ===3){
        return(
            <FormDetalles register={register} show={show} handleSubmit={handleSubmit} onSubmit={onSubmit} handleClose={handleClose} opcion={opcion}/>
        )
    };
    
    return (
        <>
            {/*Botón para crear */}
            <Button variant="primary" size="sm" onClick={() => setOpcion(1)}>
                <Icon.Plus size={16} /> {'Crear'}
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" centered keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-uppercase h1">
                        {'Formulario Departamento'}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>

                        {/*NOMBRE*/}
                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Departamento'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('nombre',
                                    {
                                        required: true
                                    }
                                )
                                }
                                isInvalid={!!errors.nombre}
                                autoComplete="off"
                            />
                            {errors?.nombre?.type === "required" && <p className="text-danger fw-danger">{"Este campo es requerido"}</p>}
                        </Form.Group>

                        {/*CÓDIGO POSTAL*/}
                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Código postal'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('cod_postal',
                                    {
                                        required: true
                                    }
                                )
                                }
                                isInvalid={!!errors.cod_postal}
                                autoComplete="off"
                            />
                            {errors?.cod_postal?.type === "required" && <p className="text-danger fw-danger">{"Este campo es requerido"}</p>}
                        </Form.Group>

                        {/*USUARIO*/}
                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Usuario'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('usuario',
                                    {
                                        required: true
                                    }
                                )
                                }
                                isInvalid={!!errors.usuario}
                                autoComplete="off"
                            />
                            {errors?.usuario?.type === "required" && <p className="text-danger fw-danger">{"Este campo es requerido"}</p>}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {/*Botón para Salir del formulario */}
                        <Button variant="secondary" size="sm" onClick={() => handleClose()}>
                            <Icon.ArrowLeft size={16} /> {'Salir'}
                        </Button>
                        
                        {/*Botón para guardar datos */}
                        <Button variant="success" size="sm" type="submit">
                            <Icon.Save size={16} /> {'Guardar'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Formulario;