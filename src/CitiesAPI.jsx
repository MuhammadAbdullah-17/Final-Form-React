import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
const CitiesAPI = () => {
  const [city, setCityData] = useState([]);
  const [Name, setName] = useState("");
  const [EditItem, setEditItem] = useState("false");
  const [ID, setID] = useState();
  useEffect(() => {
    async function getData() {
      const response = await fetch("https://localhost:44334/api/values", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json();
      //alert("result");
      setCityData(JSON.parse(result));
    }
    getData();
  }, [city]);

  const changeHandler = (e) => {
    setName(e.target.value);
  };

  const addData = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    console.log(EditItem, ID, Name);
    if (EditItem === "false") {
      fetch("https://localhost:44334/api/values", {
        method: "POST",
        body: JSON.stringify({
          Name: Name,
          ID: Math.floor(Math.random() * 100),
        }),
        headers: {
          "Content-type": "application/json",
        },
      }).catch((err) => {
        console.log(err.message);
      });
    } else {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: Name }),
      };
      fetch(`https://localhost:44334/api/values/?Id=${ID}`, requestOptions)
        .then((response) => response.json())
        .then((data) => setID(data.id));
      setEditItem(false);
    }
    setName("");
  };

  //Delete Function----------
  async function deleteData(Id) {
    fetch(`https://localhost:44334/api/values/?Id=${Id}`, { method: "DELETE" })
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  //Edit Function------------
  async function updateData(Id, Name) {
    setID(Id);
    setEditItem("true");
    setName(Name);
  }

  return (
    <>
      <div className="container">
        <form onSubmit={addData}>
          <input
            type="text"
            required
            name="Name"
            value={Name}
            onChange={changeHandler}
          />
          <button type="submit">Add City</button>
        </form>
      </div>
      <Row className="row text-center">
        <Col className="col-4">
          <h3>ID</h3>
        </Col>
        <Col className="col-4">
          <h3>City Name</h3>
        </Col>
      </Row>
      {city.map((e) => {
        return (
          <>
            <Row className="text-center">
              <Col className="col-4">
                <p className="fs-4">{e.Id}</p>
              </Col>
              <Col className="col-4">
                <p className="fs-4">{e.Name}</p>
              </Col>
              <Col className="col-4">
                <Button
                  className="btn btn-danger"
                  onClick={() => deleteData(e.Id)}
                >
                  Delete
                </Button>
                <Button
                  className="btn btn-warning mx-2"
                  onClick={() => updateData(e.Id, e.Name)}
                >
                  Edit
                </Button>
              </Col>
            </Row>
          </>
        );
      })}
    </>
  );
};

export default CitiesAPI;
