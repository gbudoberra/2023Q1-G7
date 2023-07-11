import './App.css';
import Pets from "./Components/Pets";
import MyContext from "./MyContext";
import React, {useState} from "react";
import Navbar from "./Components/Navbar"
import Ongs from "./Components/Ongs";
import Applications from "./Components/Applications";

function App() {

    let [authenticated, setAuthenticated] = useState(false)
    let [role, setRole] = useState('')
    let [section, setSection] = useState('pets')

    const context = {
        cdn: {
            url: 'https://dpapzvkpwvmip.cloudfront.net/', api_gw: 'https://dpapzvkpwvmip.cloudfront.net/prod_stage/'
        }, cognito: {
            adopter: {
                client_id: '3ugf68hcj8beg4hvo654fs2adv',
                auth_url: 'https://adopters-user-pool.auth.us-east-1.amazoncognito.com/oauth2/token',
                url: 'https://adopters-user-pool.auth.us-east-1.amazoncognito.com/',
                hosted_ui: 'https://adopters-user-pool.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=3ugf68hcj8beg4hvo654fs2adv&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fdpapzvkpwvmip.cloudfront.net%2F'

            },
            ong: {
                client_id: 'fo601u0tabmplrrf9lg7ukj0a',
                auth_url: 'https://ongs-user-pool.auth.us-east-1.amazoncognito.com/oauth2/token',
                url: 'https://ongs-user-pool.auth.us-east-1.amazoncognito.com/',
                hosted_ui: 'https://ongs-user-pool.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=fo601u0tabmplrrf9lg7ukj0a&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fdpapzvkpwvmip.cloudfront.net%2F'
            }
        },
        auth: {
            authenticated: authenticated,
            setAuthenticated: setAuthenticated,
            role: role,
            setRole: setRole
        }
    }

    return (
        <MyContext.Provider value={context}>
            <Navbar setSection={setSection} setAuthenticated={setAuthenticated} authenticated={authenticated}/>
            <div className="container-fluid" style={{backgroundColor: '#f5efe7', height: '100%'}}>
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
