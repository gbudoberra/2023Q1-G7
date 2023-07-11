import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import MyContext from "../MyContext";
import Image from "./Image";
import ConfirmPopup from "./ConfirmPopup";
import {ApplicationsFunctions} from "../ApplicationsFunctions";

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
                <Image petName={pet.pet_name}/>
                <Card.Body>
                    <Card.Title>{pet.pet_name}</Card.Title>
                    {pet.situation === 0 ? <Card.Text>Disponible</Card.Text> : <Card.Text>Adoptado</Card.Text>}
                    {pet.type === 0 ? <Card.Text>Perro</Card.Text> : <Card.Text>Gato</Card.Text>}
                    {pet.age === 0 ? <Card.Text>Joven</Card.Text> : <Card.Text>Veterano</Card.Text>}
                    {context.auth.authenticated && context.auth.authenticated.role === 'ADOPTER' &&
                        <ConfirmPopup onClickAccept={() => {
                            ApplicationsFunctions.apply(context.cdn.api_gw, pet.pet_name, context.auth.authenticated.username, pet.ong_username)
                                .then((r) => {
                                    console.log('APPLY THEN', r)
                                })
                                .catch((r) => {
                                    console.error('APPLY CATCH', r)
                                })
                        }} message={'Enviar solicitud'} btnMessage={'Aplicar'}/>
                    }
                </Card.Body>
            </Card>
        </Col>))}
        {pets.length === 0 && <Col className='text-center m-5'><span>Sin mascotas</span></Col>}
    </Row>);
}

// {
//         "ong_username": "o",
//         "type": 0,
//         "age": 0,
//         "situation": 0,
//         "name": "Ricardo.png",
//         "image":"iVBORw0KGgoAAAANSUhEUgAAADsAAAAZCAYAAACPQVaOAAAAAXNSR0IArs4c6QAAA2RJREFUWEfl2Fmod2MUBvDfUXJhzPCVKfPswhDCjfECmaeSz5B5nrkw3xEykynTHSIS7ki4oFCmC2MoCZGplKLntPZpt/sfzvnvvfXlW7Xrf/Z+3/WuZ73Pu571nhnLkc10sO6FdbFVvX8Fef4X1gX7MrbEeoVuO3w4JdIk7r9M1BnYH2tVvC/gAfzUxN8F27z/Cx9g+ymBZtqrWBl34eEefhYy9Qlsg1vwCE7HffgC5yDATQJ7QH18CKcuZKV/GHMezsRquBV34M+ePrvTb8AVuA7Xtz4+i0MK/MnzgU1ACTIDkqUh7ChcgM1qp7PGr0M4xnM4uHxtgU/qd8BfW783yS5P2tmPsTnWxg8DBdS4ORznFuXuL+Df91zjJlxaPtp4HsUJ9T7H6fcu2I2K558W4HYc6+C3TOoZXKYfirOwL27D7fi6h99sTrOjjZs3sQuexpGTaHw8HsczOKJm7YRkb7cqOAk01BnC4vOyCibrBvjbAzheisfwWTHpxUlgQ63T6qCH8wfhalxUZ+7Y1rcBYppzsSauxMV4CZdMIXmRujw5n6FvsESO5qxL44+wdelVJu2HAIyTaHAsFS+JGNJWrCRHMlav3X5qkQs0YNfH7viuYp3T+jbYJfgWn2NTPImjWwuehI0HBhpgYVIk7ptaM+sm0D62LaK9aYrOx51dGkcestA72AB3I1r1bp9V55mblvSUet4ryj0/8DpNYxG3sxrc3tlUxGTh8hL+q7BCVcqhaJsjciLCkrdGAtnkLBU6MhpLgTqwDTY7ugP2rp52D7xegzfsKQ07F1UDMmxJs5JCNISllqxaWtvtxdP2NjbTgF0DP5aOrtIa0Aye7UBaTcBCd3rHahdDqTDnQbw/BMLy0e6SAjQb1ViK1Bv1R47nMQ3Yw0pbQ61dO2ADMmCTvZ+RxuPLfwk4ZzIAE0zkJCB/GRBk4ypMDCNjXZU4u+pOvs22vg3YNOkX4uYq+42zG3EcQuPwfiXss8CgU8mT0bHt3mJPt5d/DXu2k9CATUeUO2zEuH1/za0ht5bchNJr5mn0dmwQi/F/TTEpN6pIZyQnxzJNxUSdXYzzZXFsWBfJDAu/qoL6RzvQ+S7vyyKY3jGNCTYdTG5K09g9Y5z3McGmV53WRvnf1ZhgpwU62rzlCuzfCpurGiUKAKMAAAAOZVhJZk1NACoAAAAIAAAAAAAAANJTkwAAAABJRU5ErkJggg=="
//     }
export default Pets;