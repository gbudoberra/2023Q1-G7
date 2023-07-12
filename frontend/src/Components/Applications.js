import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import MyContext from "../MyContext";
import Image from "./Image";
import {ApplicationsFunctions} from "../ApplicationsFunctions";
import Row from "react-bootstrap/Row";

// {
//     "ong_username":"ong",
//     "adopter_username":"adopter",
//     "pet_name":"Pedro",
//     "situation":0
// }

function Applications() {

    const context = useContext(MyContext);
    let [applications, setApplications] = useState([])

    useEffect(() => {
        let path = ''
        let params = {}
        if (!context.auth.authenticated)
            return
        if (context.auth.authenticated.role === 'ADOPTER') {
            path = 'applications_adopter'
            params = {
                "adopter_username": context.auth.authenticated.username
            }
        } else {
            path = 'applications_ong'
            params = {
                "ong_username": context.auth.authenticated.username
            }
        }


        axios.get(context.cdn.api_gw + path, {
            params: params
        })
            .then(response => {
                const list = response.data;
                console.log('Applications', response.data)
                setApplications(list)
            })
            .catch(error => {
                console.error('Error al hacer la solicitud GET:', error);
            });
    }, [])

    return (
        <Row xs={1} md={2} className="g-4 m-2">
            {applications.length > 0 && applications.map((app) => {
                return (
                    <Col key={app.id}>
                        <Card style={{width: '300px'}}>
                            <Image petName={app['adopter_username#pet'].split('#')[1]}/>
                            <Card.Body>
                                <Card.Title>{app['adopter_username#pet'].split('#')[1]}</Card.Title>
                                {app.situation === 0 ?
                                    <Card.Text><span style={{color: 'orange'}}>En espera</span></Card.Text> :
                                    app.situation === 1 ?
                                        <Card.Text><span style={{color: 'red'}}>Cancelado</span></Card.Text> :
                                        <Card.Text color={'green'}><span
                                            style={{color: 'green'}}>Aceptado</span></Card.Text>}
                                {(context.auth.authenticated && context.auth.authenticated.role === 'ADOPTER') ?
                                    <Card.Text>ONG: {app.ong_username}</Card.Text> :
                                    <Card.Text>Solicitante: {app['adopter_username#pet'].split('#')[0]}</Card.Text>}
                                {context.auth.authenticated && context.auth.authenticated.role === 'ONG' && app.situation === 0 &&
                                    <button type="button" data-dismiss="modal"
                                            style={{
                                                background: 'darkgreen'
                                            }} onClick={() => {
                                        ApplicationsFunctions.accept(context.cdn.api_gw, app['adopter_username#pet'].split('#')[1], app['adopter_username#pet'].split('#')[0], context.auth.authenticated.username).then((r) => {
                                            console.log('ACCEPT THEN', r)
                                        })
                                            .catch((r) => {
                                                console.error('ACCEPT CATCH', r)
                                            })
                                    }}
                                    >Aceptar
                                    </button>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
            {applications.length === 0 &&
                <Col className='text-center m-5'><span>No tiene ninguna solicitud</span></Col>}
        </Row>)
}

export default Applications;