import React, {useContext, useState} from 'react';
import '../App.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Login from "./Login";
import {LoginFunctions} from "../LoginFunctions";
import MyContext from "../MyContext";

function Navbar({section, setSection, authenticated}) {

    let [openModal, setOpenModal] = useState(false)

    const context = useContext(MyContext)

    function handleCloseModal() {
        setOpenModal(false);
    }

    return (
        <nav className="navbar" style={{backgroundColor: ' #213555 '}}>
            <ul className="navbar-list">
                <Row>
                    <Col className={'col'}>
                        <button onClick={() => {
                            setSection('pets')
                        }} style={section === 'pets' ? {fontWeight: "bold"} : {}}>Mascotas
                        </button>
                    </Col>
                    {authenticated && <Col className={'col'}>
                        <li>
                            <button onClick={() => setSection('applications')}
                                    style={section === 'applications' ? {fontWeight: "bold"} : {}}>Solicitudes
                            </button>
                        </li>
                    </Col>}
                    {authenticated && <Col className={'col'}>
                        <li>
                            <button onClick={() => {
                                setSection('pets')
                                LoginFunctions.logout(context.auth)
                            }}>Cerrar sesión
                            </button>
                        </li>
                    </Col>}
                    {!authenticated && <Col className={'col'}>
                        <Login/>
                    </Col>}
                </Row>
            </ul>
        </nav>
    );
}

export default Navbar;
