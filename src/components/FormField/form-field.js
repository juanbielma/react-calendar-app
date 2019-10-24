import React from "react";

import "./form-field.scss"

const FormField = props => {
  return (
    <div className="form-field">
      <label htmlFor={props.id}> {props.labelText} </label>
      <input
        type={props.type}
        name={props.id}
        id={props.id}
        placeholder={props.placeholder}
        {...props.binding}
      />
    </div>
  );
};

export default FormField;
