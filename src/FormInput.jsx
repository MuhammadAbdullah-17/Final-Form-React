import React, { useState } from "react";
import { Field } from "react-final-form";
import "./index.css";
const FormInput = ({ data }) => {

  const [inputData, setInputData] = useState(
    {
      usename:"",
      message:""
    }
  )
  return (
    <>
      {data.InputType === "textarea" ? (
        <Field name={data.name}>
          {({ input, meta }) => (
            <div className="mt-4">
              <label className="fs-2 me-5">{data.name}</label>
              <textarea
                required
                name={data.name}
                className="fin"
                {...input}
                value={inputData.message}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    message: e.target.value,
                  })
                }
                type={data.InputType}
                placeholder={data.name}
              />
              {meta.touched && meta.error && (
                <div className="err">{meta.error}</div>
              )}
            </div>
          )}
        </Field>
      ) : (
        <Field name={data.name}>
          {({ input, meta }) => (
            <div className="mt-3">
              <label className="fs-2 me-5">{data.name}</label>
              <input
                required
                name={data.name}
                className="fin"
                {...input}
                value={inputData.username}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    username: e.target.value,
                  })
                }
                type={data.InputType}
                placeholder={data.name}
              />
              {meta.error && meta.touched && (
                <div className="err">{meta.error}</div>
              )}
            </div>
          )}
        </Field>
      )}
    </>
  );
};

export default FormInput;
