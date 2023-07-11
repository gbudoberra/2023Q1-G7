import axios from 'axios';
import jwtDecode from 'jwt-decode';

export async function getRole(token, context) {
  if (token) {
    const tok = jwtDecode(token);
    console.log('tok' + tok)
    const username = tok["cognito:username"];
    const email = tok.email;

    return await axios.get(context.cdn.api_gw + 'users', {
      params: {
        username: username,
        email: email
      }
    }).then(response => {
      console.log('/users response', response.data);
      console.log(response)
      return response.data.Role
    })
    .catch(error => {
      console.error(error);
      throw error
    });
  }
}
