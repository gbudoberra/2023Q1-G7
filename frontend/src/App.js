import './App.css';
import Pets from "./Components/Pets";
import MyContext from "./MyContext";
import React, {useState} from "react";
import Navbar from "./Components/Navbar"
import Applications from "./Components/Applications";

function App() {

    let [authenticated, setAuthenticated] = useState(null)
    let [section, setSection] = useState('pets')

    const context = {
        cdn: {
            url: 'https://d2phc0laxy8erv.cloudfront.net/', api_gw: 'https://d2phc0laxy8erv.cloudfront.net/prod_stage/'
        }, cognito: {
            adopter: {
                client_id: '273rgpvtkmr4iu7g71ejmtlml9',
                auth_url: 'https://adopters-user-pool.auth.us-east-1.amazoncognito.com/oauth2/token',
                url: 'https://adopters-user-pool.auth.us-east-1.amazoncognito.com/',
                hosted_ui: 'https://adopters-user-pool.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=273rgpvtkmr4iu7g71ejmtlml9&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd2phc0laxy8erv.cloudfront.net%2F'

            },
            ong: {
                client_id: '1un73bimo78q68k7v05ikj5cbm',
                auth_url: 'https://ongs-user-pool.auth.us-east-1.amazoncognito.com/oauth2/token',
                url: 'https://ongs-user-pool.auth.us-east-1.amazoncognito.com/',
                hosted_ui: 'https://ongs-user-pool.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=1un73bimo78q68k7v05ikj5cbm&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd2phc0laxy8erv.cloudfront.net%2F'
            }
        },
        auth: {
            authenticated: authenticated,
            setAuthenticated: setAuthenticated
        }
    }

    return (
        <MyContext.Provider value={context}>
            <Navbar section={section} setSection={setSection} setAuthenticated={setAuthenticated}
                    authenticated={authenticated}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {section === 'pets' && <Pets/>}
                        {section === 'applications' && <Applications/>}
                    </div>
                </div>
            </div>
        </MyContext.Provider>

    );
}

export default App;
