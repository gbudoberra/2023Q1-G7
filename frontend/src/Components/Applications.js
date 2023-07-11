import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import MyContext from "../MyContext";
import Image from "./Image";

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
        <div>
            {applications.length > 0 && applications.map((app) => {
                return (
                    <Col key={app.id}>
                        <Card style={{width: '300px'}}>
                            <Image petName={app.pet_name}/>
                            <Card.Body>
                                <Card.Title>{app.pet_name}</Card.Title>
                                {app.situation === 0 ? <Card.Text>En espera</Card.Text> :
                                    <Card.Text>Adoptado</Card.Text>}
                                {(context.auth.authenticated && context.auth.authenticated.role === 'ADOPTER') ?
                                    <Card.Text>ONG: {app.ong_username}</Card.Text> :
                                    <Card.Text>Solicitante: {app.adopter_username}</Card.Text>}
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
            {applications.length === 0 &&
                <Col className='text-center m-5'><span>No tiene ninguna solicitud</span></Col>}
        </div>)
}

export default Applications;