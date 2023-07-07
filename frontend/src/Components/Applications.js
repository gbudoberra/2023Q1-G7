import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import MyContext from "../MyContext";

function Applications() {

    const context = useContext(MyContext);
    let [applications, setApplications] = useState([{
        "ong_id": 1,
        "pet_id":1,
        "name":"pepito",
        "situation" : 1
}])
    let [ongs, setOngs] = useState([{"ong_id": 1, "neighborhood": "CABA", "name": "adoptemos todos", "email": "adoptemos@gmail.com"}])



    useEffect(() => {

        axios.get(context.cdn.api_gw + 'ongs')  .then(response => {
                const list = response.data;
                setOngs(list)
            })
            .catch(error => {
                console.error('Error al hacer la solicitud GET:', error);
            });
    }, [])

    useEffect(() => {
        axios.get(context.cdn.api_gw + 'applications')
            .then(response => {
                const list = response.data;
                setApplications(list)
            })
            .catch(error => {
                console.error('Error al hacer la solicitud GET:', error);
            });
    }, [ongs])

    return (
        <div>
                {applications.map((app) => {
                    const ong = ongs.filter((e) => e.ong_id === app.ong_id)[0];
                    return (
                        <Col key={app.id}>
                            <Card style={{ width: '300px' }}>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>{app.name}</Card.Title>
                                    <Card.Text>{ong.name}</Card.Text>
                                    <Card.Text>{ong.neighborhood}</Card.Text>
                                </Card.Body>
                            </Card>
                    </Col>
                    );
            })}
        </div>)
}

export default Applications;