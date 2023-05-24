import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";

const AddUser = () => {
  const [errMessage, setErrMessage] = useState("");
  const [errMessageAge, setErrMessageAge] = useState("");
  const [errMessageAddress, setErrMessageAddress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [addressId, setAddressId] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const userName = useRef();
  const age = useRef();
  const address = useRef();
  const handleAddAddress = () => {
    const addressValue = address?.current?.value;
    if (!addressValue) {
      setErrMessageAddress("Address is empty");
      setTimeout(() => {
        setErrMessageAddress("");
      }, 3000);
      return;
    }
    axios
      .post(
        "http://localhost:8000/address",
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
        console.log(res.data._id);
        setAddressId(res.data._id);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
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
  useEffect(() => {
    if (addressId !== "") {
      handleSubmit(addressId);
    }
  }, [addressId]);
  // add username and age function
  const handleSubmit = (addressId) => {
    const userNameVal = userName?.current?.value;
    if (!userNameVal) {
      setErrMessage("User name is empty");
      setTimeout(() => {
        setErrMessage("");
      }, 3000);
      return;
    }
    const ageValue = age?.current?.value;
    if (!ageValue) {
      setErrMessageAge(`Age should be greater than
       or equal to 20.`);
      setTimeout(() => {
        setErrMessageAge("");
      }, 3000);
      return;
    } else if (typeof ageValue !== Number) {
      setErrMessageAge(`age shoud be numbers only`);
      setTimeout(() => {
        setErrMessageAge("");
      }, 3000);
      return;
    }
    axios
      .post(
        "http://localhost:8000/user",
        {
          userName: userNameVal,
          age: ageValue,
          address: addressId,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setSuccessMessage("user Added successfully");
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
        <h3>Add user</h3>
      </div>
      <div className="editUser mt-5">
        <div className="Edit">
          <div className="m-2">
            <div>
              <label htmlFor="">name</label>
            </div>
            <input type="text" className="form-control" ref={userName} />
            <small
              className="smallErr"
              style={{
                color: "red",
              }}
            >
              {errMessage}
            </small>
          </div>
          <div className="m-2">
            <div>
              <label htmlFor="">age</label>
            </div>
            <input type="text" className="form-control" ref={age} />
            <small id="smallErr">{errMessageAge}</small>
          </div>
          <div className="m-2">
            <div>
              <label htmlFor="">address</label>
            </div>
            <input type="text" className="form-control" ref={address} />
            <small id="smallErr">{errMessageAddress}</small>
          </div>
          <div>
            <button
              className="btn btn-success mt-3"
              disabled={isButtonDisabled}
              onClick={() => [handleAddAddress()]}
            >
              Add
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddUser;
