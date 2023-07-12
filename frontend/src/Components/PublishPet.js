import {useContext, useState} from "react";
import MyContext from "../MyContext";
import FormSelectInput from "./FormInputs/FormSelectInput";
import FormDefaultTextInput from "./FormInputs/FormDefaultTextInput";
import {PostPetFunctions} from "../PostPetFunctions";


//context.auth.authenticated.username

function PublishPet() {

    const context = useContext(MyContext);

    const lettersRegex = "[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]*";

    const [name, setName] = useState(null)
    const [animal, setAnimal] = useState(0)
    const [age, setAge] = useState(0)

    const [isPending, setIsPending] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [image, setImage] = useState('')


    const fields = {
        name: {
            field: name,
            setter: setName,
            name: 'petName',
            type: 'text',
            placeholder: 'Nombre',
            required: true,
            pattern: lettersRegex,
            title: "Solo letras",
            maxLength: 100,
            error: '',
            errorMessage: ''
        }, animal: {
            field: animal,
            setter: setAnimal,
            name: 'petType',
            placeholder: "Tipo",
            required: true,
            options: [{value: '', text: 'Seleccione una opción'}, {
                value: 0, text: 'Perro'}, {value: 1, text: 'Gato'}],
            error: '',
            errorMessage: ''
        }, age: {
            field: age,
            setter: setAge,
            name: 'age',
            placeholder: 'Edad',
            required: true,
            options: [{value: '', text: 'Seleccione una opción'}, {
                value: 0, text: 'Joven'}, {value: 1, text: 'Veterano'}],
            error: '',
            errorMessage: ''
        }
    }
    function getBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const base64String = reader.result.replace("data:", "")
                    .replace(/^.+,/, "");
            console.log('getBase64', base64String);
            setImage(base64String)
        };
        reader.onerror = function (error) {
        console.log('Error: ', error);

   };
}

    const onChange = (event) => {
        event.preventDefault();
        Object.values(fields).every(field => {
            if (field.name === event.target.id) {
                field.setter(event.target.value)
                return false;
            }
            return true;
        });
    }

    async function onImageChange(e) {
        e.preventDefault()
        if (e.target.files[0].size > (1024 * 1024)) {
            //toast.error('Tamaño de image muy grande')
            setImageError(true)
        } else {
            setIsPending(true)

            const file = e.target.files[0];
            getBase64(file);

            setIsPending(false)
            setImageError(false)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (imageError) {
            //toast.error('Tamaño de image muy grande')
            console.log("ERROR: Image error")
            return;
        }
        if (!context.auth.authenticated || context.auth.authenticated.role !== 'ONG')
            return
        setIsPending(true)

        console.log(image)

        PostPetFunctions.submit(context.cdn.api_gw, context.auth.authenticated.username, name, animal, age, image).
        then(()=> setIsPending(false))

    }

    return (
        <form onSubmit={e => onSubmit(e)} encType="multipart/form-data">
        <div className="container">
            <div className="row mb-3">
                <div className="col">
                    <FormDefaultTextInput field={fields.name} onChange={onChange}/>
                </div>
                <div className="col">
                    <FormSelectInput field={fields.animal} onChange={onChange}/>
                </div>
            </div>
            <div className=" row mb-3">
                <div className="col">
                    <FormSelectInput field={fields.age} onChange={onChange}/>
                </div>
                <div className="col">
                    <div className="form-floating">
                        <input type="file" placeholder="Imagen"
                               className="form-control" accept="image/png, image/gif, image/jpeg" required={true}
                               onChange={onImageChange}/>
                        <label>
                            Imagen *
                        </label>
                    </div>
                </div>
            </div>
            <div className="row-publish row mb-3 text-center">
                <div className="col col-publish">
                    <div>
                        <input type="submit" disabled={isPending} value={"Publicar"}
                               className="btn btn-primary btn-lg"/>
                    </div>
                </div>
            </div>
        </div>
    </form>)
}

export default PublishPet;