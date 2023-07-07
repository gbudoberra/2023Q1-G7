import {Button, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";
import MyContext from "../MyContext";

function Login({authenticated, setAuthenticated}) {

    // let [code, setCode] = useState('')

    const context = useContext(MyContext);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        if(code){
            login(code)
        }else setAuthenticated(false)
    }, [])

    const login = (code) => {

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

    // const handleChange = (event) => {
    //     setCode(event.target.value);
    // };
    const hostedUI = () => {
        window.location.href = context.cognito.hosted_ui;
    };

    return (<div>
        {authenticated ? <button onClick={logout}>Cerrar sesión</button> : <button onClick={hostedUI}>Iniciar sesión</button>}
    </div>)

}

export default Login;