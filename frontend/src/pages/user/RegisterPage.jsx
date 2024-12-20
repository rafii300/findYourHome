import React, { useEffect, useState } from "react";
import { Row, Col, Form, ButtonGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/thunk/userThunk";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current_user, loading, success, error } = useSelector(
    (state) => state.user
  );

  const initialState = {
    name: "",
    email: "",
    address: "",
    password: "",
  };
  const [state, setState] = useState(initialState);

  function handleRegister() {
    dispatch(
      registerUser({
        ...state,
        password: state.password,
      })
    );
  }

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [current_user]);

  return (
    <Row className="bg-light justify-content-center align-items-center vh-100">
      <Col md={1} className="position-absolute top-0 start-0 py-2">
        <Button variant="dark" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left" />
        </Button>
      </Col>
      <Col className="bg-white rounded shadow-lg" md={4}>
        <h1 className="text-center p-2">Sign Up</h1>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="p-2" controlId="formBasicFirstName">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="p-2" controlId="formBasicEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="p-2" controlId="formBasicLastName">
            <Form.Label className="fw-bold">Address</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={2}
              placeholder="Address"
              value={state.address}
              onChange={(e) => setState({ ...state, address: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="p-2" controlId="formBasicPassword">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </Form.Group>
          <ButtonGroup className="d-flex p-3">
            <Button
              variant="dark"
              type="submit"
              onClick={() => handleRegister()}
            >
              Submit
            </Button>
          </ButtonGroup>
        </Form>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"} message={"Wrong info"} />
        ) : (
          <></>
        )}
      </Col>
    </Row>
  );
}

export default RegisterPage;
