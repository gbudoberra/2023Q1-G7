import {useContext, useEffect} from "react";
import axios from "axios";
import qs from "qs";
import MyContext from "../MyContext";
import {getRole} from "../jwt";

function OngLogin({authenticated, setAuthenticated}) {

    const context = useContext(MyContext);

    useEffect(() => {
        if(!context.auth.authenticated){
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            if (code) {
                OngLogin(code)
            } else setAuthenticated(false)
        }
    }, [])

    const OngLogin = (code) => {

        const endpoint = context.cognito.ong.auth_url;

        const data = qs.stringify({
            grant_type: 'authorization_code',
            client_id: context.cognito.ong.client_id,
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
                context.auth.setRole(getRole(response.data.id_token, context))
                axios.defaults.headers.common['Authorization'] = response.data.id_token;
                console.log('AUTH ROLE: ' + context.auth.role)
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

    const hostedUI = () => {
        window.location.href = context.cognito.ong.hosted_ui;
    };

    return (<div>
            <button onClick={hostedUI}>Iniciar sesión como ONG</button>
    </div>)

}

export default OngLogin;