import React from "react";
import {ApplicationsFunctions} from "../ApplicationsFunctions";

function ConfirmPopup({message, context, pet}) {
    return (<div>
        <button data-toggle="modal"
                data-target="#exampleModalCenter">
            Aplicar
        </button>

        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{message}</h5>
                    </div>
                    <div className="modal-footer">
                        <button type="button" data-dismiss="modal"
                        style={{
                            background: 'darkgreen'
                        }} onClick={() => {
                            ApplicationsFunctions.apply(context.cdn.api_gw, pet.pet_name, context.auth.authenticated.username, pet.ong_username)
                                .then((r) => {
                                    console.log('APPLY THEN', r)
                                })
                                .catch((r) => {
                                    console.error('APPLY CATCH', r)
                                })
                        }}
                        >Confirmar
                        </button>
                        <button type="button" style={{
                            background: 'darkred'
                        }} data-dismiss="modal">Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default ConfirmPopup
