import axios from "axios";

export class ApplicationsFunctions {
    static async apply(api_gw, pet, adopter, ong) {
        return await axios.post(api_gw + 'applications_adopter', JSON.stringify(
            {
                ong_username: ong,
                adopter_username: adopter,
                pet_name: pet
            }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log('APPLY', response)
        }).catch((error) => {
            console.log(error)
            throw error
        })
    }

    static async accept(api_gw, pet, adopter, ong){
        return await axios.post(api_gw + 'adopt', JSON.stringify(
            {
                ong_username: ong,
                adopter_username: adopter,
                pet_name: pet
            }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log('ACCEPT', response)
        }).catch((error) => {
            console.log(error)
            throw error
        })
    }
}
