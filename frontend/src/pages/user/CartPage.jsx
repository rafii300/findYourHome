import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Form, Image, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Initial } from "../../redux/slice/cartSlice";
import { getUserCart, deleteCartItem } from "../../redux/thunk/cartThunk";
import Header from "../../components/Header";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current_user } = useSelector((state) => state.user);
  const { product_list, pages, loading, error } = useSelector(
    (state) => state.cart
  );

  const [page, setPage] = useState(1);
  const [method, setMethod] = useState("Bkash");

  useEffect(() => {
    dispatch(getUserCart(current_user.Id, page));
    return () => dispatch(Initial());
  }, [page]);

  if (!Object.keys(current_user).length) return <Navigate to="/login" />;
  else {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Row className="p-3">
          <Col>
            <h2 className="py-2">My WishList</h2>
            {product_list.length ? (
              <ListGroup>
                {product_list.map((product) => (
                  <ListGroup.Item key={product.Id}>
                    <Row>
                      <Col className="d-flex align-items-center" md={2}>
                        <Image
                          src={"http://127.0.0.1:8000" + product.product.image}
                          width="50%"
                          fluid
                          rounded
                        />
                      </Col>
                      <Col className="d-flex align-items-center" md={2}>
                        <strong>{product.product.name}</strong>
                      </Col>
                      <Col className="d-flex align-items-center" md={2}>
                        {product.product.price}
                      </Col>
                      <Col className="d-flex align-items-center" md={2}>
                        <Form.Control
                          as="select"
                          value={product.items}
                          onChange={(e) => setMethod(e.target)}
                        >
                          <option value={"Bkash"}>Bkash</option>
                          <option value={"Nagad"}>Nagad</option>
                        </Form.Control>
                      </Col>

                      <Col
                        className="d-flex justify-content-center align-items-center"
                        md={2}
                      >
                        <Button
                          variant="danger"
                          onClick={() =>
                            dispatch(deleteCartItem(product.Id, product.userId))
                          }
                        >
                          Delete
                        </Button>
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center">
                        <Button
                          variant="dark"
                          onClick={() => {
                            navigate("/order", {
                              state: {
                                name: product.product.name,
                                price: product.product.price,
                                method: method === "Bkash" ? "Bkash" : "Nagad",
                                area: product.product.area,
                                rating: product.product.rating,
                              },
                            });
                          }}
                        >
                          Checkout
                        </Button>
                      </Col>
                    </Row>
                    {error ? (
                      <Message
                        variant={"danger"}
                        message={"Couldn't add to cart"}
                      />
                    ) : loading ? (
                      <Loader />
                    ) : (
                      <></>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Message variant={"warning"} message={"Cart is empty"} />
            )}
          </Col>
        </Row>
        <Footer pages={pages} page={page} setPage={setPage} />
      </div>
    );
  }
}

export default CartPage;
