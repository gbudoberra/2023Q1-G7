import axios from 'axios';
import jwtDecode from 'jwt-decode';

export async function decode(token, api_gw) {
    if (token) {
        const tok = jwtDecode(token);
        console.log('tok' + tok)
        const username = tok["cognito:username"];
        const email = tok.email;

        return await axios.get(api_gw + 'users', {
            params: {
                username: username,
                email: email
            }
        }).then(response => {
            console.log('/users response', response.data);
            return {
                role: response.data.Role,
                username: username
            }
        })
            .catch(error => {
                console.error(error);
                throw error
            });
    }
}
