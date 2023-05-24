import React from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./UsersCard.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function UsersCard({ item, index }) {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`Edit/${id}`);
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are You Want to Remove user?",
      width: 300,

      text: "You will not be able to recover the user again",

      icon: "warning",
      showCancelButton: true,

      confirmButtonText: "Yes Delete it",

      cancelButtonText: "No Keep it",
    }).then((result) => {
      if (result.value) {
        // "",
        // "success",
        Swal.fire({
          title: "Deleted",
          width: 300,
          text: "user deleted succefully",
          icon: "success",
        });
        axios
          .delete(`http://localhost:8000/user/${id}`)
          .then((res) => {
            console.log(res.data.data);
          })

          .catch((err) => {
            console.log(err.message);
          });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          // "Cancelled", "Your user is Save", "error"
          title: "Cancelled",
          width: 300,
          text: "Your user is Save",
          icon: "error",
        });
      }
    });
  };
  return (
    <>
      <table class="table table-dark table-hover table-bordered border-primary">
        <thead>
          <tr>
            <th>#</th>
            <th>User name</th>
            <th>Age</th>
            <th>addresses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.userName}</td>
            <td>{item.age}</td>
            <td>
              <ul className="text-center">
                {item.address[0].descreption.map((address, index) => (
                  <li key={index}>{address}</li>
                ))}
              </ul>
            </td>
            <td>
              <Row>
                <Col>
                  <div className="details">
                    <i
                      class="fa-solid fa-user-xmark"
                      id="userXmark"
                      onClick={() => deleteUser(item._id)}
                    ></i>
                    <span class="message">Delete</span>
                  </div>
                </Col>
                <Col>
                  <div className="details2">
                    <i
                      class="fa-solid fa-user-pen"
                      id="userEdit"
                      onClick={() => handleNavigate(item._id)}
                    ></i>
                    <span className="message2">Edit</span>
                  </div>
                </Col>
              </Row>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default UsersCard;
