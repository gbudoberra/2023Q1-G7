import axios from "axios";

export class PostPetFunctions {
    static async submit(api_gw, username, name, animal, age, image) {
        return await axios.post(api_gw + 'pets', JSON.stringify(
            {
                name: name,
                type: animal,
                age: age,
                ong_username: username,
                image: image
            }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log('SUBMIT', response)
        }).catch((error) => {
            console.log(error)
            throw error
        })
    }
}