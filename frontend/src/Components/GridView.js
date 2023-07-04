import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import MyContext from "../MyContext";

function GridExample() {

    const context = useContext(MyContext);
    let [pets, setPets] = useState([])

    useEffect(() => {
        axios.get(context.cdn.api_gw + 'pets')
            .then(response => {
                const list = response.data;
                console.log(list);
                setPets(list)
                console.log(pets)
            })
            .catch(error => {
                console.error('Error al hacer la solicitud GET:', error);
            });
    }, [])

    return (<Row xs={1} md={2} className="g-4">
            {Array.from({length: 4}).map((_, idx) => (<Col key={idx}>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160"/>
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit
                                longer.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>))}
        </Row>);
}

export default GridExample;