import {useContext, useEffect, useState} from "react";
import MyContext from "../MyContext";
import axios from "axios";
import Card from "react-bootstrap/Card";

function Image({petName}) {
    const context = useContext(MyContext);
    let [image, setImage] = useState()

    useEffect(() => {
        axios.get(context.cdn.api_gw + 'image', {
            params: {
                name: petName
            }
        }).then((response) => {
            console.log('GET IMAGE RESPONSE', response)
            setImage(response.data)
        }).catch((e) => {
            console.error('get image', petName, e)
        })
    }, [])

    return (
        <div>
            {image && <Card.Img variant="top" src={"data:image/png;base64, " + image}/>}
        </div>
    )

}

export default Image