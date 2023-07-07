import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import MyContext from "../MyContext";

function Pets({auth}) {

    const context = useContext(MyContext);
    let [pets, setPets] = useState([{"situation": 1, "id": 1, "name": "Tarzan", "ong_id": 1, "type": 1, "age": 1},{"situation": 1, "id": 1, "name": "Tarzan", "ong_id": 1, "type": 1, "age": 1},{"situation": 1, "id": 1, "name": "Tarzan", "ong_id": 1, "type": 1, "age": 1},{"situation": 1, "id": 1, "name": "Tarzan", "ong_id": 1, "type": 1, "age": 1},{"situation": 1, "id": 1, "name": "Tarzan", "ong_id": 1, "type": 1, "age": 1}])

    // useEffect(() => {
    //     axios.get(context.cdn.api_gw + 'pets')
    //         .then(response => {
    //             const list = response.data;
    //             console.log(list);
    //             setPets(list)
    //             console.log(pets)
    //         })
    //         .catch(error => {
    //             console.error('Error al hacer la solicitud GET:', error);
    //         });
    // }, [auth])

    return (<Row xs={1} md={2} className="g-4 m-2">
            {pets.map((pet) => (<Col key={pet.id} className={'m-1'}>
                    <Card style={{ width: '300px' }}>
                        <Card.Img  variant="top" src={require('/home/bsquillari/PycharmProjects/2023Q1-G7/frontend/src/Components/Untitled.jpeg')}/>
                        <Card.Body>
                            <Card.Title>{pet.name}</Card.Title>
                            {pet.situation === 0 ? <Card.Text>Disponible</Card.Text>:<Card.Text>Adoptado</Card.Text>}
                            {pet.type === 0 ? <Card.Text>Perro</Card.Text>:<Card.Text>Gato</Card.Text>}
                            {pet.age === 0 ? <Card.Text>Joven</Card.Text>:<Card.Text>Veterano</Card.Text>}
                        </Card.Body>
                    </Card>
                </Col>))}
        </Row>);
}

export default Pets;