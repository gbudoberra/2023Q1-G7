import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import MyContext from "../MyContext";

function Ongs() {

    const context = useContext(MyContext);
    let [ongs, setOngs] = useState([{"ong_id": 1, "neighborhood": "CABA", "name": "adoptemos todos", "email": "adoptemos@gmail.com"}])

    useEffect(() => {
        axios.get(context.cdn.api_gw + 'ongs')
            .then(response => {
                const list = response.data;
                console.log(list);
                setOngs(list)
                console.log(ongs)
            })
            .catch(error => {
                console.error('Error al hacer la solicitud GET:', error);
            });
    }, [])

    return (<Row xs={1} md={2} className="g-4">
            {ongs.map((ong) => (<Col key={ong.id}>
                    <Card style={{ width: '300px' }}>
                        <Card.Body>
                            <Card.Title>{ong.name}</Card.Title>
                            {/*{pet.situation === 0 ? <Card.Text>Disponible</Card.Text>:<Card.Text>Adoptado</Card.Text>}*/}
                            <Card.Text>{ong.neighborhood}</Card.Text>
                            <Card.Text>{ong.email}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>))}
        </Row>);
}

export default Ongs;