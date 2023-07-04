import './App.css';
import GridExample from "./Components/GridView";
import {Container} from "react-bootstrap";
import Login from "./Components/Login";
import MyContext from "./MyContext";
import {useState} from "react";

function App() {

    let [authenticated, setAuthenticated] = useState(false)

    const context = {
        cdn: {
            url: 'https://dee0fj8jo4th8.cloudfront.net/', api_gw: 'https://dee0fj8jo4th8.cloudfront.net/prod_stage/'
        }, cognito: {
            client_id: '1kr6cuv4oi8ic2lp5tjq0c0f0',
            auth_url: 'https://adoptemos-todos.auth.us-east-1.amazoncognito.com/oauth2/token',
            url: 'https://adoptemos-todos.auth.us-east-1.amazoncognito.com/',
            hosted_ui: 'https://adoptemos-todos.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=1kr6cuv4oi8ic2lp5tjq0c0f0&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fdee0fj8jo4th8.cloudfront.net%2F'
        }
    }

    return (<MyContext.Provider value={context}>
            <Container className="p-3">
                <Login authenticated={authenticated} setAuthenticated={setAuthenticated}/>
                {authenticated ? <GridExample/> : <h1>Iniciar sesión</h1>}
            </Container>
        </MyContext.Provider>);
}

export default App;
