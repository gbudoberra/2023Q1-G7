import React, {useContext, useEffect} from "react";
import MyContext from "../MyContext";
import {LoginFunctions} from "../LoginFunctions";

function Login() {

    const context = useContext(MyContext);

    useEffect(() => {
        if (!context.auth.authenticated) {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            console.log('code ', code)
            if (code) {

                LoginFunctions.login(code, context.cognito.adopter, context.cdn).then((auth) => {
                    console.log('login adopter', auth)
                    context.auth.setAuthenticated(auth)
                }).catch((error) => {
                    console.error('login adopter', error)
                })

                LoginFunctions.login(code, context.cognito.ong, context.cdn).then((auth) => {
                    console.log('login adopter', auth)
                    context.auth.setAuthenticated(auth)
                }).catch((error) => {
                    console.error('login ong', error)
                })

            }
        }
    }, [])

    return (
        <div>
            <button data-toggle="modal"
                    data-target="#exampleModalCenter">
                Iniciar sesión
            </button>

            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Iniciar sesión</h5>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => {
                                LoginFunctions.hostedUI(context.cognito.adopter)
                            }} type="button" data-dismiss="modal">Adoptante
                            </button>
                            <button onClick={() => {
                                LoginFunctions.hostedUI(context.cognito.ong)
                            }} type="button" data-dismiss="modal">ONG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
