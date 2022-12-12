import { useContext, useState } from "react";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import './RegisterUser.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css'
import UserContext from "../../context/UserContext";

const Register = () => {
    const { registerUser } = useContext(UserContext);
    const [input, setInput] = useState({
        first_name: {
            value: "",
            error: ""
        },
        last_name: {
            value: "",
            error: ""
        },
        email: {
            value: "",
            error: ""
        },
        password: {
            value: "",
            error: ""
        },
        phone: {
            value: "",
            error: ""
        }
    });

    const [image, setImage] = useState(null);

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
        setImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false;
        Object.keys(input).forEach(key => {
            if (input[key].value.trim().length === 0) {
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
            form.append("first_name", input.first_name.value);
            form.append("last_name", input.last_name.value);
            form.append("email", input.email.value);
            form.append("password", input.password.value);
            form.append("avatar", image);
            form.append("phone", input.phone.value);
            registerUser(form);
        }
    }

    const handleInputPhoneChange = (value, data, event, formattedValue) => {
        handleInputChange(event);
    }

    return (
        <div>
            <Container className='RegisterContainer'>
                <h1 className="RegisterTitle">Registro de Usuario</h1>
                <Form>
                    <Row>
                        <Col sm>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control name="first_name" type="text" value={input.first_name.value} onChange={handleInputChange} required />
                            {input.first_name.error && <p style={{ color: "red" }}>{input.first_name.error}</p>}
                        </Col>
                        <Col sm>
                            <Form.Label>Apellido: </Form.Label>
                            <Form.Control type="text" name="last_name" value={input.last_name.value} onChange={handleInputChange} required />
                            {input.last_name.error && <p style={{ color: "red" }}>{input.last_name.error}</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="text" name="email" value={input.email.value} onChange={handleInputChange} required />
                            {input.email.error && <p style={{ color: "red" }}>{input.email.error}</p>}
                        </Col>
                        <Col sm>
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control name="password" type={"password"} value={input.password.value} onChange={handleInputChange} required />
                            {input.password.error && <p style={{ color: "red" }}>{input.password.error}</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Form.Label>Telefono:</Form.Label>
                            <PhoneInput
                                inputStyle={{ padding: "0.375rem 3.3rem", width: '100%' }}
                                inputProps={{
                                    name: 'phone',
                                    required: true
                                }}
                                country={'ar'}
                                value={input.phone.value}
                                onChange={handleInputPhoneChange}
                            />
                            {input.phone.error && <p style={{ color: "red" }}>{input.phone.error}</p>}
                        </Col>
                        <Col sm={6}>
                            <Form.Label>Imagen de Perfil</Form.Label>
                            <Form.Control type={"file"} onChange={handleImageChange} />
                        </Col>
                    </Row>
                    <Button variant="outline-dark" type="submit" onClick={handleSubmit}>
                        Registrarse
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Register;