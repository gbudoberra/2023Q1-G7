import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import MyContext from "../MyContext";

function Pets({}) {

    const context = useContext(MyContext);
    let [pets, setPets] = useState([])

    useEffect(() => {
        axios.get(context.cdn.api_gw + 'pets')
            .then(response => {
                const list = response.data
                console.log(list)
                setPets(list)
            })
            .catch(error => {
                console.error('Error al hacer la solicitud GET:', error);
            });
    }, [])

    return (<Row xs={1} md={2} className="g-4 m-2">
        {pets.length > 0 && pets.map((pet) => (<Col key={pet.id} className={'m-1'}>
            <Card style={{width: '300px'}}>
                <Card.Img variant="top" src={require('./Untitled.jpeg')}/>
                <Card.Body>
                    <Card.Title>{pet.pet_name}</Card.Title>
                    {pet.situation === 0 ? <Card.Text>Disponible</Card.Text> : <Card.Text>Adoptado</Card.Text>}
                    {pet.type === 0 ? <Card.Text>Perro</Card.Text> : <Card.Text>Gato</Card.Text>}
                    {pet.age === 0 ? <Card.Text>Joven</Card.Text> : <Card.Text>Veterano</Card.Text>}
                </Card.Body>
            </Card>
        </Col>))}
        {pets.length === 0 && <Col className='text-center m-5'><span>Sin mascotas</span></Col>}
    </Row>);
}

export default Pets;