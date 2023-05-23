import React from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./UsersCard.css";
import Swal from "sweetalert2";

function UsersCard({ item, index }) {
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are You Want to Remove user?",

      text: "You will not be able to recover the user again",

      icon: "warning",
      showCancelButton: true,

      confirmButtonText: "Yes Delete it",

      cancelButtonText: "No Keep it",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted", "user deleted succefully", "success");
        axios
          .delete(`http://localhost:4000/user/${id}`)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your user is Save", "error");
      }
      // location.reload();
    });
  };
  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User name</th>
            <th>Age</th>
            <th>address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.userName}</td>
            <td>{item.age}</td>
            <td>{item.address[0].descreption}</td>
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
                    <i class="fa-solid fa-user-pen" id="userEdit"></i>
                    <span className="message2">Edit</span>
                  </div>
                </Col>
              </Row>
            </td>
          </tr>
          {/* <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </Table>
    </>
  );
}

export default UsersCard;
