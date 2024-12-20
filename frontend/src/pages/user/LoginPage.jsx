import React, { useState, useEffect } from "react";
import { Row, Col, Form, ButtonGroup, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/thunk/userThunk";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current_user, loading, success, error } = useSelector(
    (state) => state.user
  );

  const initialState = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);

  function handleLogin() {
    dispatch(
      loginUser({
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
        <Button
          variant="dark"
          onClick={() =>
            Object.keys(current_user).length ? navigate(-1) : navigate("/")
          }
        >
          <i className="bi bi-arrow-left" />
        </Button>
      </Col>
      <Col className="bg-white rounded shadow-lg" md={4}>
        <h1 className="text-center p-2">Sign In</h1>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="p-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="p-3" controlId="formBasicPassword">
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
            <Button variant="dark" type="submit" onClick={() => handleLogin()}>
              Submit
            </Button>
          </ButtonGroup>
        </Form>
        <section className="p-3">
          Looking to
          <Link to="/register" className="text-primary px-1">
            create an account
          </Link>
          ?
        </section>
        <section className="p-2">
          {error ? (
            <Message variant={"danger"} message={"Wrong Credentials"} />
          ) : loading ? (
            <Loader />
          ) : (
            <></>
          )}
        </section>
      </Col>
    </Row>
  );
}

export default LoginPage;
