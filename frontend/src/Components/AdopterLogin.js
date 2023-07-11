import {useContext, useEffect} from "react";
import axios from "axios";
import qs from "qs";
import MyContext from "../MyContext";
import {getRole} from "../jwt";

function AdopterLogin({authenticated, setAuthenticated}) {

    const context = useContext(MyContext);

    useEffect(() => {
        if (!context.auth.authenticated) {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            console.log('code ' + code)
            if (code) {
                AdopterLogin(code)
            } else setAuthenticated(false)
        }
    }, [])

    const AdopterLogin = (code) => {

        const endpoint = context.cognito.adopter.auth_url;

        const data = qs.stringify({
            grant_type: 'authorization_code',
            client_id: context.cognito.adopter.client_id,
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
                getRole(response.data.id_token, context).then((role) => {
                    context.auth.setRole(role)
                    axios.defaults.headers.common['Authorization'] = response.data.id_token;
                    console.log('ROLE: ' + role)
                    setAuthenticated(true)
                }).catch((error) => {
                    console.error(error);
                })
            })
            .catch((error) => {
                console.error(error);
                // setAuthenticated(false)
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
        window.location.href = context.cognito.adopter.hosted_ui;
    };

    return (<div>
        {authenticated ? <button onClick={logout}>Cerrar sesión</button> :
            <button onClick={hostedUI}>Iniciar sesión como adoptante</button>}
    </div>)

}

export default AdopterLogin;