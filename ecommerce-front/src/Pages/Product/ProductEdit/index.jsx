import { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import '../../Product/ProductEdit/ProductEdit.css';
import 'react-phone-input-2/lib/bootstrap.css'
import { useParams } from "react-router-dom";
import { createAlert, createAlertWithCallback } from "../../../Utils/alerts.js";
import { ALERT_STATUS } from "../../../constants/alertStatus.js";
import ProductService from '../../../Services/productsService';
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const ProductEdit = () => {
    const initialValuesState = {
        name: {
            value: "",
            error: ""
        },
        description: {
            value: "",
            error: ""
        },
        price: {
            value: "",
            error: ""
        },
        stock: {
            value: "",
            error: ""
        }
    }
    const { id } = useParams();
    const [input, setInput] = useState(initialValuesState);
    const [image, setImage] = useState(null);
    const service = new ProductService();
    const navigation = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (id) {
            service.getById(id, callbackSuccessGetProduct, callbackError);
        }
    }, [])

    const handleInputChange = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: {
                value: e.target.value,
                error: null
            }
        }))
    };

    const handleImageChange = (e) => {
        debugger
        setImage(e.target.files[0])
    }

    const resetFileInput = () => {
        inputRef.current.value=null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false;
        Object.keys(input).forEach(key => {
            if (input[key].value.toString().trim().length === 0) {
                error = true;
                setInput((prev) => ({
                    ...prev,
                    [key]: {
                        ...prev[key],
                        error: 'Completar este campo'
                    },
                }))
            }
        })
        if (!error) {
            let form = new FormData();
            form.append("name", input.name.value);
            form.append("description", input.description.value);
            form.append("price", input.price.value);
            form.append("stock", input.stock.value);
            form.append("img", image);

            if (id) {
                service.update(id, form, callbackSuccessUpdate, callbackError);
            } else {
                service.register(form, callbackSuccessRegister, callbackError);
            }
        }
    }

    // --------------------- Callbacks ---------------------------
    const callbackSuccessRegister = (res) => {
        createAlertWithCallback(ALERT_STATUS.SUCCESS, 'Producto registrado', '', () => {
            setInput(initialValuesState);
            resetFileInput();
        });
    };

    const callbackSuccessUpdate = (res) => {
        createAlertWithCallback(ALERT_STATUS.SUCCESS, 'Producto Modificado', '', () => {
            setInput(initialValuesState);
            navigation('/');
        });
    };

    const callbackSuccessGetProduct = (res) => {
        const product = res.data.payload;
        Object.keys(input).forEach(key => {
            setInput((prev) => ({
                ...prev,
                [key]: {
                    value: product[key],
                    error: ''
                },
            }))
        })
    };

    const callbackError = (error) => {
        createAlert(ALERT_STATUS.ERROR, 'Error', error?.response?.data?.error ?? error.message);
    };

    return (
        <div>
            <Container className='RegisterContainer'>
                {id ? <h1 className="RegisterTitle">Modificación de Productos</h1> : <h1 className="RegisterTitle">Registro de Productos</h1>}
                <Form>
                    <Row>
                        <Col sm>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control name="name" type="text" value={input.name.value} onChange={handleInputChange} required />
                            {input.name.error && <p style={{ color: "red" }}>{input.name.error}</p>}
                        </Col>
                        <Col sm>
                            <Form.Label>Descripción: </Form.Label>
                            <Form.Control type="text" name="description" value={input.description.value} onChange={handleInputChange} required />
                            {input.description.error && <p style={{ color: "red" }}>{input.description.error}</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Label>Precio:</Form.Label>
                            <Form.Control type="number" name="price" value={input.price.value} onChange={handleInputChange} required />
                            {input.price.error && <p style={{ color: "red" }}>{input.price.error}</p>}
                        </Col>
                        <Col sm>
                            <Form.Label>Stock:</Form.Label>
                            <Form.Control name="stock" type="number" value={input.stock.value} onChange={handleInputChange} required />
                            {input.stock.error && <p style={{ color: "red" }}>{input.stock.error}</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control ref={inputRef} type={"file"} onChange={handleImageChange} />
                        </Col>
                    </Row>
                    <Button variant="outline-dark" type="submit" onClick={handleSubmit}>
                        {id ? "Modificar" : "Registrar"}
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default ProductEdit;