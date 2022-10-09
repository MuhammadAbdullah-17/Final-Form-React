import { Field, Form } from "react-final-form";
import React, { useEffect, useState } from "react";
//import FormInput from "./FormInput";
import { Row, Col, Button } from "react-bootstrap";
import "./index.css";

function App() {
  const getLocalItems = () => {
    let list = localStorage.getItem("lists");
    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState({
    username: "",
    message: "",
  });
  const [items, setItems] = useState(getLocalItems());
  const [isEditItem, setIsEditItem] = useState(null);
  const onSubmit = (e) => {
    console.log(items);
  };
  // const validate = (e) => {
  //   //  var letters = /^[A-Za-z]+$/;
  //   const errors = {};
  //   if (e.Message && e.Message.length < 4) {
  //     errors.Message = "Too short Message.";
  //   }
  //   if (!e.Username) {
  //     errors.Username = "Proper Username Required";
  //   }
  //   return errors;
  // };
  // const initialVals = {
  //   Message: "Great Experience",
  // };
  const formData = [
    {
      id: "1",
      name: "Username",
      InputType: "text",
    },
    {
      id: "2",
      name: "Message",
      InputType: "textarea",
    },
  ];
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  const addComment = () => {
    console.log(inputData);
    console.log(isEditItem)
    if (isEditItem != null) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return {
              ...elem,
              username: inputData.username,
              message: inputData.message,
            };
          }
          return elem;
        })
      );
      setIsEditItem(null);
    }
    else 
    {const allInputData = {
      id: new Date().getTime().toString(),
      username: inputData.username,
      message: inputData.message,
    };
    setItems([...items, allInputData]);
  }
    setInputData({
      username: "",
      message: "",
    });
  };
  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updateditems);
  };

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    setInputData({
      ...inputData,
      username: newEditItem.username,
      message: newEditItem.message,
    });
    setIsEditItem(id);
  };

  return (
    <>
      <div className="container">
        <div className="row text-align-center">
          <Form
            onSubmit={onSubmit}
            // validate={validate}
            // initialValues={initialVals}
            render={({ handleSubmit, reset, pristine, submitting, values }) => (
              <>
                <div className="text-center">

{/* Final Form */}
                  <form id="msgForm" onSubmit={handleSubmit}>
                    {formData.map((data) => {
                      return (
                        <>
                          {data.InputType === "textarea" ? (
                            <Field name={data.name}>
                              {({ input, meta }) => (
                                <div className="mt-4">
                                  <label className="fs-2 me-5">
                                    {data.name}
                                  </label>
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
                                  <label className="fs-2 me-5">
                                    {data.name}
                                  </label>
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
                    })}
                    <Button
                      type="submit"
                      variant="outline-success"
                      onClick={addComment}
                      className="btn mt-4 btn-outline-success"
                      disabled={submitting}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </>
            )}
          />
        </div>
{/* Grid */}
        <div className="showItems text-center">
          <Row className="mt-4 r1">
            <Col>
              <h2>Customer</h2>
            </Col>
            <Col>
              <h2>Comment</h2>
            </Col>
            <Col>
              <h2>Options</h2>
            </Col>
          </Row>
          {items.map((elem) => {
            return (
              <div className="eachItem" key={elem.id}>
                <Row className="mt-4">
                  <Col>
                    <p className="fs-5">{elem.username}</p>
                  </Col>
                  <Col>
                    <p className="fs-5">{elem.message}</p>
                  </Col>
                  <Col>
                    <div className="todo-btn">
                      <Button
                        variant="outline-warning"
                        className="btn rounded-pill"
                        name="Edit Item"
                        onClick={() => editItem(elem.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="btn rounded-pill mx-3"
                        name="Delete Item"
                        onClick={() => deleteItem(elem.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default App;
