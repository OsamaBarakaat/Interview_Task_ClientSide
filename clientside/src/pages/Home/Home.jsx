import { Button, Pagination } from "react-bootstrap";
import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import "./Home.css";
import UsersCard from "../../components/usersCard/UsersCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_DB_URL);
  const [users, setUsers] = useState([]);
  const [numOfPage, setNumOfPage] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/user?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setNumOfPage(res.data.pageNumbers);
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    setPage(page - 1);
  };
  const handleNavigate = () => {
    navigate("Add");
  };
  return (
    <>
      <div className="container">
        <div className="row m-3">
          <div className="col">
            <Button variant="success" onClick={() => handleNavigate()}>
              Add
            </Button>
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
        <div className="pag">
          <div>
            <Pagination>
              <Pagination.First />
              <Pagination.Prev disabled={page <= 1} onClick={handlePrev} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next
                disabled={page >= numOfPage}
                onClick={handleNext}
              />
              <Pagination.Last />
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
