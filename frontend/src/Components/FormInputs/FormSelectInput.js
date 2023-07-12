import React from "react";

const FormSelectInput = ({field, onChange}) => {
    return (<div className='form-floating'>
            <select id={field.name} className="form-control"
                    placeholder={field.placeholder} name={field.name}
                    required={field.required}
                    onChange={e => onChange(e)}
                    value={field.value}
            >
                {field.options && field.options.map((option) => (<option value={option.value}>
                    {option.text}
                </option>))}
            </select>
            <label>
                {field.error && <p style={{color: 'red'}}>{field.errorMessage}</p>}
                {/*{field.placeholder}{field.required ? " *" : ""}*/}
            </label>
        </div>);
}
export default FormSelectInput;