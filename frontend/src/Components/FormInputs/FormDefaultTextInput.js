import React from "react";

const FormDefaultTextInput = ({field, onChange, style}) => {
    return(
        <div className={"mx-auto"} style={style}>
            <div className='form-floating'>
                <input type={field.type} id={field.name} className="form-control"
                       placeholder={field.placeholder} name={field.name}
                       required={field.required}
                       pattern={field.pattern}
                       title={field.title}
                       maxLength={field.maxLength}
                       onChange={e => onChange(e)}
                       value={field.value}
                />
                <label>
                    {field.error && <p style={{color: 'red'}}>{field.errorMessage}</p>}
                    {field.placeholder}{field.required ? " *" : ""}
                </label>
            </div>
        </div>

    );
}
export default FormDefaultTextInput;