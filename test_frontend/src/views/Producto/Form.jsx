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
            setValue('precio', oneData.precio)
            setValue('cantidad', oneData.cantidad)
            setValue('existencia', oneData.existencia)
            setValue('creado', oneData.creado)
            setValue('creado_por', oneData.creado_por)
            setValue('actualizado', oneData.actualizado)
            setValue('actualizado_por', oneData.actualizado_por)
        },
        onSubmit = (data) => {
            let jsData = {
                nombre: data.nombre,
                precio: data.precio,
                cantidad: data.cantidad,
                existencia: data.existencia,
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
            <Button variant="primary" size="sm" onClick={() => setOpcion(1)}>
                <Icon.Plus size={16} /> {'Crear'}
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" centered keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-uppercase h1">
                        {'Formulario Producto'}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Producto'}</Form.Label>
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
                        
                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Precio'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('precio',
                                    {
                                        required: true
                                    }
                                )
                                }
                                isInvalid={!!errors.precio}
                                autoComplete="off"
                            />
                            {errors?.precio?.type === "required" && <p className="text-danger fw-danger">{"Este campo es requerido"}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            {/*Texto-título*/}
                            <Form.Label className="fw-bolder"><Icon.Circle size={15} className="text-danger" /> {'Cantidad de productos'}</Form.Label>
                            {/*input que recibe los datos*/}
                            <Form.Control
                                {...register('cantidad',
                                    {
                                        required: true
                                    }
                                )
                                }
                                isInvalid={!!errors.cantidad}
                                autoComplete="off"
                            />
                            {errors?.cantidad?.type === "required" && <p className="text-danger fw-danger">{"Este campo es requerido"}</p>}
                        </Form.Group>

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
                        <Button variant="secondary" size="sm" onClick={() => handleClose()}>
                            <Icon.ArrowLeft size={16} /> {'Salir'}
                        </Button>
                        
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