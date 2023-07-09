import React from 'react';
import '../App.css';
import AdopterLogin from "./AdopterLogin";
import OngLogin from "./OngLogin";

function Navbar({setSection, setAuthenticated, authenticated}) {
    return (
        <nav className="navbar" style={{ backgroundColor: ' #213555 ' }}>
            <ul className="navbar-list">
                <div className={'row'}>
                    <div className={'col'}>
                        <li>
                            <button onClick={() => {
                                setSection('pets')
                            }} >Mascotas
                            </button>
                        </li>
                    </div>
                    <div className={'col'}>
                        <li>
                            <button onClick={() => setSection('ONGs')}>ONGs</button>
                        </li>
                    </div>
                    { authenticated && <div className={'col'}>
                        <li>
                            <button onClick={() => setSection('applications')}>Solicitudes</button>
                        </li>
                    </div> }
                    <div className={'col space-between'}>
                        <li>
                            <AdopterLogin authenticated={authenticated} setAuthenticated={setAuthenticated}/>
                        </li>
                    </div>
                              <div className={'col space-between'}>
                        <li>
                            <OngLogin authenticated={authenticated} setAuthenticated={setAuthenticated}/>
                        </li>
                    </div>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
