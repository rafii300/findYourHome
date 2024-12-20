import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Table,
  Image,
  Button,
} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Initial } from "../../redux/slice/cartSlice";
import {
  getUserCart,
  updataCartItem,
  deleteCartItem,
} from "../../redux/thunk/cartThunk";
import Header from "../../components/Header";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current_user } = useSelector((state) => state.user);
  const { product_list, products, items, price, pages, loading, error } =
    useSelector((state) => state.cart);

  const [page, setPage] = useState(1);

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
          <Col md={8}>
            <h2 className="py-2">Shopping Cart</h2>
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
                          onChange={(e) =>
                            dispatch(
                              updataCartItem(product.Id, {
                                items: e.target.value,
                              })
                            )
                          }
                        >
                          {[...Array(product.product.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                      <Col className="d-flex align-items-center" md={2}>
                        {"Total : " + product.items * product.product.price}
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
          <Col md={4}>
            <Row className="px-2">
              <h2 className="py-2">Summary</h2>
              <Table striped bordered>
                <tbody>
                  <tr>
                    <td>Total Product</td>
                    <td>{products}</td>
                  </tr>
                  <tr>
                    <td>Total Items</td>
                    <td>{items}</td>
                  </tr>
                  <tr>
                    <td>Total Price</td>
                    <td>{price}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row className="px-2">
              <Button
                variant="dark"
                onClick={() => {
                  if (price) {
                    navigate("/order", {
                      state: {
                        products: products,
                        items: items,
                        price: price,
                      },
                    });
                  }
                }}
              >
                Checkout
              </Button>
            </Row>
          </Col>
        </Row>
        <Footer pages={pages} page={page} setPage={setPage} />
      </div>
    );
  }
}

export default CartPage;
