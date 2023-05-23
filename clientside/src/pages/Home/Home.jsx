import { Button } from "react-bootstrap";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import UsersCard from "../../components/usersCard/UsersCard";
const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/user", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container">
        <div className="row m-3">
          <div className="col">
            <Button variant="success">Add</Button>
          </div>
        </div>
        <Row>
          <div>
            <Row xs={1} md={1} sm={1}>
              {users.map((item, index) => (
                <UsersCard item={item} index={index} />
              ))}
            </Row>
          </div>
        </Row>
      </div>
    </>
  );
};

export default Home;
