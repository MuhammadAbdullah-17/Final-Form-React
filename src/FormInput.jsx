import React from "react";
import { Field } from "react-final-form";
import './index.css'
const FormInput = ({ id, data }) => {
  return (
    <>
      {data.InputType === "textarea" ? (
        <Field name={data.name} id ={id}>
            
          {({ input, meta }) => (
            <div className="mt-4">
                <label className="fs-2 me-5">{data.name}</label>
              <textarea  className="fin ms-3"  {...input} />
              {meta.touched && meta.error && <div className="err">{meta.error}</div>}
            </div>
          )}
        </Field>
      ) : (
        <Field name={data.name} id ={id}>
          {({ input, meta }) => (
            <div className="mt-3">
              <label className="fs-2 me-5">{data.name}</label>
              <input className="fin" {...input}  type={data.InputType} placeholder={data.name} />
              {meta.error && meta.touched && <div className="err">{meta.error}</div>}
            </div>
          )}
        </Field>
      )}
    </>
  );
};

export default FormInput;
