import React from "react";

function ConfirmPopup({btnMessage, message, onClickAccept}) {
    return (<div>
        <button data-toggle="modal"
                data-target="#exampleModalCenter">
            {btnMessage}
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
                                }} onClick={onClickAccept}
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
