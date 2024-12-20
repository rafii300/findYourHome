import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Table,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Initial } from "../../redux/slice/orderSlice";
import { createOrder, getOrderById } from "../../redux/thunk/orderThunk";
import { deleteUserCart } from "../../redux/thunk/cartThunk";
import Header from "../../components/Header";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function BookingPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { current_user } = useSelector((state) => state.user);
  const { loading, success, error, order_id, pending } = useSelector(
    (state) => state.order
  );

  const initalState = {
    name: "None",
    price: 0,
    method: "None",
    area: "None",
    rating: 0,
  };
  const order = Object.keys(location.state).length
    ? location.state
    : initalState;

  const [buttonPressed, setButtonPressed] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  function handleOrder() {
    if (!buttonDisable) {
      dispatch(
        createOrder({
          ...order,
          userId: current_user.Id,
          price: order.price + 50,
          method: order.method,
          pending: true,
        })
      );
      setButtonPressed(true);
    }
  }

  function handleOderSuccess() {
    if (!pending) setOrderSuccess(true);
  }

  useEffect(() => {
    if (buttonPressed && success) {
      setButtonDisable(true);
      setTimeout(() => {
        dispatch(Initial());
        dispatch(deleteUserCart(current_user.Id));
      }, 1500);
    }
    return () => dispatch(Initial());
  }, [buttonPressed, success]);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (buttonDisable && pending) {
        dispatch(getOrderById(order_id));
      }
    }, 1000);
    if (!pending) clearInterval(myInterval);
    return () => clearInterval(myInterval);
  }, [pending, buttonDisable]);

  if (!Object.keys(current_user).length) return <Navigate to="/login" />;
  else {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <h1 className="py-2 text-center">ORDER</h1>
        <Row className="px-3">
          <Col md={8}>
            <ListGroup>
              <ListGroup.Item>
                <h2>Details:</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{"Name : " + current_user.name}</p>
                <p>{"Email : " + current_user.email}</p>
                <p>{"Address : " + current_user.address}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method:</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Method : {order.method}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Table striped bordered>
              <thead>
                <tr>
                  <th colSpan={2}>
                    <h2 className="py-2">Booking Summary</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{order.name}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{order.price}</td>
                </tr>
                <tr>
                  <td>Area</td>
                  <td>{order.area}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>{order.rating}</td>
                </tr>
                <tr>
                  <td>Total Cost</td>
                  <td>{order.price ? order.price + 50 : 0}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <ButtonGroup className="d-flex">
                      {buttonDisable ? (
                        <Button
                          disabled={orderSuccess}
                          variant={pending ? "warning" : "success"}
                          onClick={() => handleOderSuccess()}
                        >
                          {pending ? "Processing" : "Payment"}
                        </Button>
                      ) : (
                        <Button variant="dark" onClick={() => handleOrder()}>
                          Order
                        </Button>
                      )}
                    </ButtonGroup>
                  </td>
                </tr>
              </tbody>
            </Table>
            {!orderSuccess ? (
              error ? (
                <Message
                  variant={"danger"}
                  message={"Error on dealing with order"}
                />
              ) : loading ? (
                <Loader />
              ) : success ? (
                <Message
                  variant={"success"}
                  message={"Successfully ordered your items"}
                />
              ) : (
                <></>
              )
            ) : (
              <Message variant={"success"} message={"Payment Complete!!!"} />
            )}
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

export default BookingPage;
