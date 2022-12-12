import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useContext, useState } from 'react';
import '../Login/Login.css';
import { Link } from "react-router-dom";
import UserContext from '../../context/UserContext.js';

const Login = () => {
    const { login } = useContext(UserContext);
    const [input, setInput] = useState({
        email: {
            value: "",
            error: ""
        },
        password: {
            value: "",
            error: ""
        }
    })
    const handleInput = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: {
                value: e.target.value,
                error: null
            }
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false;
        Object.keys(input).forEach(key => {
            if (input[key].value.trim().length === 0) {
                error = true;
                setInput((prev => ({
                    ...prev,
                    [key]: {
                        ...prev[key],
                        error: "Completa los campos"
                    }
                })))
            }
        })
        if (!error) {
            login(input.email.value, input.password.value);
        }
    }

    return (
        <div>
            <Container className='LoginContainer'>
                <h1 className="LoginTitle">Inicio de sesión</h1>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm>
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control name="email" type="text" value={input["email"].value} onChange={handleInput} required />
                            {input.email.error && <p style={{ color: "red" }}>{input.email.error}</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control name="password" type="password" value={input["password"].value} onChange={handleInput} required />
                            {input.password.error && <p style={{ color: "red" }}>{input.password.error}</p>}
                        </Col>
                    </Row>
                    <div className="LoginBtn">
                        <Button variant="outline-dark" type="submit"> Iniciar sesión </Button>
                        <Button as={Link} to='/register' variant="outline-dark"> Registrar usuario </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
};

export default Login;
