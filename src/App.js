import { Form } from "react-final-form";
import React from "react";
import FormInput from "./FormInput";
import { Row, Col, Button } from "react-bootstrap";

function App() {
  const allData = [];
  const onSubmit = (e) => {
    let jsonData = JSON.stringify(e);
    let currData = JSON.parse(jsonData);
    //document.getElementById("username").innerHTML = currData.Username;
    //document.getElementById("msg").innerHTML = currData.Message;
    allData.push(currData);
    console.log(allData);
    clearFields();
  };
  const clearFields=()=>{
    
    document.getElementById("msgForm").reset();
  }
  const validate = (e) => {
    //  var letters = /^[A-Za-z]+$/;
    const errors = {};
    if (e.Message && e.Message.length < 4) {
      errors.Message = "Too short Message.";
    }
    if (!e.Username) {
      errors.Username = "Proper Username Required";
    }
    return errors;
  };
  const initialVals = {
    Message: "Great Experience",
  };
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
  const DeleteMsg=(id)=>{
    console.log(id);
  }
  const EditMsg=(id)=>{
    console.log(id);
  }

  return (
    <>
      <div className="container">
        <div className="row text-align-center">
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialVals}
            render={({ handleSubmit, reset, pristine, submitting, values }) => (
              <>
                <div className="text-center">
                  <form id="msgForm" onSubmit={handleSubmit}>
                    {formData.map((data) => {
                      return <FormInput id={data.id} data={data} />;
                    })}
                    <button
                      type="submit"
                      onClick={reset}
                      className="btn mt-4 btn-success"
                      disabled={submitting || pristine}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </>
            )}
          />
        </div>
        <Row className="mt-5">
          <Col>
            <h3>Customer Name</h3>
          </Col>
          <Col>
            <h3>Message</h3>
          </Col>
          <Col>
          <h3>Options</h3>
          </Col>
        </Row>
        {allData.map((id, data) => {
          return (
            <>
              <Row className="mt-5">
                <Col>
                {data.Message}
                  {/* <div id="username"></div> */}
                </Col>
                <Col>
                {data.Username}
                  {/* <div id="msg"></div> */}
                </Col>
                <Col>
                  {
                    <>
                    <Button className="btn btn-warning me-5" onClick={EditMsg(id)}>Edit</Button>
                    <Button className="btn btn-danger" onClick={DeleteMsg(id)}>Delete</Button>
                    </>
                  }
                </Col>
              </Row>
            </>
          );
        })}
      </div>
    </>
  );
}
export default App;
