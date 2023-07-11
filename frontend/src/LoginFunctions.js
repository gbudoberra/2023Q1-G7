import qs from "qs";
import axios from "axios";
import {decode} from "./jwt";

export class LoginFunctions {
    static async login(code, cognito_user_pool, cdn) {
        const endpoint = cognito_user_pool.auth_url;

        const data = qs.stringify({
            grant_type: 'authorization_code',
            client_id: cognito_user_pool.client_id,
            redirect_uri: cdn.url,
            code: code,
        });

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        return await axios.post(endpoint, data, config)
            .then((response) => {
                console.log(response.data);
                axios.defaults.headers.common['Authorization'] = response.data.id_token;
                return decode(response.data.id_token, cdn.api_gw)
            })
            .catch((error) => {
                console.error(error);
                throw error
            });

    }

    static logout(auth) {
        delete axios.defaults.headers.common["Authorization"]
        auth.setAuthenticated(null)
    }

    static hostedUI(cognito_user_pool) {
        window.location.href = cognito_user_pool.hosted_ui;
    }
}