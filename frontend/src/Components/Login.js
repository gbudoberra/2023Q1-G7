import {Button, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useContext, useState} from "react";
import axios from "axios";
import qs from "qs";
import MyContext from "../MyContext";

function Login({authenticated, setAuthenticated}) {

    let [code, setCode] = useState('')

    const context = useContext(MyContext);

    const login = () => {

        const endpoint = context.cognito.auth_url;

        const data = qs.stringify({
            grant_type: 'authorization_code',
            client_id: context.cognito.client_id,
            redirect_uri: context.cdn.url,
            code: code,
        });

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        axios.post(endpoint, data, config)
            .then((response) => {
                console.log(response.data);
                axios.defaults.headers.common['Authorization'] = response.data.id_token;
                setAuthenticated(true)
            })
            .catch((error) => {
                console.error(error);
                setAuthenticated(false)
            });

    };

    const logout = () => {
        delete axios.defaults.headers.common["Authorization"];
        setAuthenticated(false)
    }

    const handleChange = (event) => {
        setCode(event.target.value);
    };
    const hostedUI = () => {
        window.location.href = context.cognito.hosted_ui;
    };

    return (<Container>
        {authenticated ? <Button onClick={logout}>Cerrar sesión</Button> : <Row className='p-3'>
            <Col className='col-3'>
                <input type="text" placeholder='Código' value={code} onChange={handleChange}/>
            </Col>
            <Col className='text-center col-1'>
                <Button onClick={hostedUI}>Obtener código</Button>
            </Col>
            <Col className='col-1 text-center'>
                <Button onClick={login}>Iniciar sesión</Button>
            </Col>
        </Row>}
    </Container>)

}

export default Login;