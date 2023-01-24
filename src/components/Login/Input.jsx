import { ErrorMessage, useField } from "formik";
import React from "react";
const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="login-modal-container-left-block">
        <label
          htmlFor={field.name}
          className="login-modal-container-left-block-label"
        >
          {label}
        </label>
        <input autoComplete="off" {...field} {...props} />

        <ErrorMessage
          component="p"
          name={field.name}
          className="login-modal-container-left-block-error"
        >
          {field.name}
        </ErrorMessage>
      </div>
    </>
  );
};

export default Input;
