import './App.css';
import Pets from "./Components/Pets";
import MyContext from "./MyContext";
import React, {useState} from "react";
import Navbar from "./Components/Navbar"
import Applications from "./Components/Applications";
import PublishPet from "./Components/PublishPet";

function App() {

    let [authenticated, setAuthenticated] = useState(null)
    let [section, setSection] = useState('pets')

    const context = {
        cdn: {
            url: 'https://d1dxrl0d2mjxif.cloudfront.net/', api_gw: 'https://d1dxrl0d2mjxif.cloudfront.net/prod_stage/'
        }, cognito: {
            adopter: {
                client_id: '7acpkvp6jtqfa6kd7qr1gahmot',
                auth_url: 'https://adopters-user-pool.auth.us-east-1.amazoncognito.com/oauth2/token',
                url: 'https://adopters-user-pool.auth.us-east-1.amazoncognito.com/',
                hosted_ui: 'https://adopters-user-pool.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=7acpkvp6jtqfa6kd7qr1gahmot&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd1dxrl0d2mjxif.cloudfront.net%2F'

            },
            ong: {
                client_id: '2s1odam8popenu6qqkd7j70bp',
                auth_url: 'https://ongs-user-pool.auth.us-east-1.amazoncognito.com/oauth2/token',
                url: 'https://ongs-user-pool.auth.us-east-1.amazoncognito.com/',
                hosted_ui: 'https://ongs-user-pool.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=2s1odam8popenu6qqkd7j70bp&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd1dxrl0d2mjxif.cloudfront.net%2F'
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
                        {section === 'publishPet' && <PublishPet/>}
                    </div>
                </div>
            </div>
        </MyContext.Provider>

    );
}

export default App;
