import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./Edit.css";
import {
  Alert,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from "react-bootstrap";
function Edit() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [errMessage, setErrMessage] = useState("");
  const [errMessageAddress, setErrMessageAddress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [keepOldAge, setKeepOldAge] = useState(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const userName = useRef();
  const age = useRef();
  const address = useRef();
  const newAddress = useRef();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((res) => {
        console.log(res.data);
        // console.log("aaaa", user.address[0]._id);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleEdit = () => {
    let newAge;
    if (keepOldAge) {
      newAge = user?.age;
    } else {
      newAge = age?.current?.value;
    }
    setIsButtonDisabled(true);
    if (!address?.current?.value) {
      setErrMessageAddress("Address is empty");
      setTimeout(() => {
        setErrMessageAddress("");
        setIsButtonDisabled(false);
      }, 3000);
      return; // Exit the function without making the PUT request
    }
    axios
      .put(
        `http://localhost:8000/user/${id}`,
        {
          userName: userName?.current?.value,
          age: newAge,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setSuccessMessage("user updated successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        // window.location.reload();
        setIsButtonDisabled(false);
      })
      .catch((err) => {
        console.log(err);
        setErrMessage(err.response.data.message);
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 3000);
        setTimeout(() => {
          setErrMessage("");
        }, 3000);
      });
  };
  const handleEditAddress = () => {
    const addressValue = address?.current?.value;

    if (!addressValue) {
      setErrMessageAddress("Address is empty");
      setTimeout(() => {
        setErrMessageAddress("");
      }, 3000);
      return; // Exit the function without making the PUT request
    }
    axios
      .put(
        `http://localhost:8000/address/${user.address[0]._id}`,
        {
          descreption: addressValue,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        setIsButtonDisabled(false);
      })
      .catch((err) => {
        console.log(err);
        setErrMessageAddress(err.response.data.message);
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 3000);
        setTimeout(() => {
          setErrMessageAddress("");
        }, 3000);
      });
  };
  const handleSubmitNewAddress = () => {
    axios
      .put(`http://localhost:8000/address/${user.address[0]._id}`, {
        descreption: [
          user?.address[0]?.descreption[0],
          newAddress?.current?.value,
        ],
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {successMessage && (
        <Row>
          <Col md={{ span: 3, offset: 8 }}>
            <Alert key="success" variant="success">
              {successMessage}
            </Alert>
          </Col>
        </Row>
      )}
      <div className="title text-center mt-5">
        <h3>Edit user</h3>
      </div>
      <div className="editUser mt-5">
        <div className="Edit">
          <div className="m-2">
            <div>
              <label htmlFor="">name</label>
            </div>
            <input
              type="text"
              className="form-control"
              ref={userName}
              placeholder={user?.userName}
            />
          </div>
          <div className="m-2">
            <div>
              <label htmlFor="">age</label>
            </div>
            <input
              type="text"
              className="form-control"
              ref={age}
              placeholder={user?.age}
            />
            <small id="smallErr">{errMessage}</small>
            <div className="radioCheck">
              <label>
                <input
                  type="radio"
                  checked={keepOldAge}
                  onChange={() => setKeepOldAge(true)}
                />
                Keep old age
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  checked={!keepOldAge}
                  onChange={() => setKeepOldAge(false)}
                />
                Enter new age
              </label>
              <br />
            </div>
          </div>
          <div className="m-2">
            <div>
              <label htmlFor="">address</label>
            </div>
            <input
              type="text"
              className="form-control"
              ref={address}
              placeholder={user?.address[0].descreption}
            />
            <small id="smallErr">{errMessageAddress}</small>
          </div>
          {user?.address[0]?.descreption.length < 2 ? (
            <div>
              <label htmlFor="">Or Add another address !</label>
              <button className="btn btn-secondary" onClick={handleShow}>
                Add
              </button>
            </div>
          ) : (
            <p
              style={{
                color: "green",
                backgroundColor: "rgba(211, 211, 211, 0.622)",
                borderRadius: "10px",
              }}
            >
              Maximum 2 addresses
            </p>
          )}
          <div>
            <Modal show={show} onHide={handleClose} className="text-center">
              <Modal.Header closeButton id="modalTitle">
                <Modal.Title>
                  <h5>Enter the descreption of the new address</h5>
                </Modal.Title>
              </Modal.Header>
              <ModalBody className="modalBody">
                <div className="row">
                  <input
                    type="text"
                    ref={newAddress}
                    className="form-control"
                    placeholder="new address"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="row">
                  <div className="col-9"></div>
                  <div className="col">
                    <Button
                      className="btn btn-warning"
                      onClick={() => {
                        handleSubmitNewAddress();
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </Modal>
          </div>
          <div>
            <button
              className="btn btn-success mt-3"
              onClick={() => [handleEdit(), handleEditAddress()]}
              disabled={isButtonDisabled}
            >
              Edit
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
