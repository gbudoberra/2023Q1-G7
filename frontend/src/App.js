import './App.css';
import Pets from "./Components/Pets";
import {Container} from "react-bootstrap";
import MyContext from "./MyContext";
import React, {useState} from "react";
import Navbar from "./Components/Navbar"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Ongs from "./Components/Ongs";
import Applications from "./Components/Applications";

function App() {

    let [authenticated, setAuthenticated] = useState(false)
    let [section, setSection] = useState('pets')

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

    return (
        <MyContext.Provider value={context} >
            <Navbar setSection={setSection} setAuthenticated={setAuthenticated} authenticated={authenticated}/>
            <div className="container-fluid" style={{ backgroundColor: '#F5EFE7', height: '100%' }}>
                <div className="row">
                    <div className="col">
                        {section === 'pets' && <Pets auth={authenticated}/>}
                        {section === 'ONGs' && <Ongs/>}
                        {section === 'applications' && <Applications/>}
                    </div>
                </div>
            </div>
        </MyContext.Provider>

    );
}

export default App;
