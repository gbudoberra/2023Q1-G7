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
            url: 'https://d2phc0laxy8erv.cloudfront.net/', api_gw: 'https://d2phc0laxy8erv.cloudfront.net/prod_stage/'
        }, cognito: {
            adopter: {
                client_id: '3ugf68hcj8beg4hvo654fs2adv',
                auth_url: 'https://adopters-user-pool-gaspar.auth.us-east-1.amazoncognito.com/oauth2/token',
                url: 'https://adopters-user-pool-gaspar.auth.us-east-1.amazoncognito.com/',
                hosted_ui: 'https://adopters-user-pool-gaspar.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=3ugf68hcj8beg4hvo654fs2adv&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fdpapzvkpwvmip.cloudfront.net%2F'

            },
            ong: {
                client_id: 'fo601u0tabmplrrf9lg7ukj0a',
                auth_url: 'https://ongs-user-pool-gaspar.auth.us-east-1.amazoncognito.com/oauth2/token',
                url: 'https://ongs-user-pool-gaspar.auth.us-east-1.amazoncognito.com/',
                hosted_ui: 'https://ongs-user-pool-gaspar.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=fo601u0tabmplrrf9lg7ukj0a&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fdpapzvkpwvmip.cloudfront.net%2F'
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
