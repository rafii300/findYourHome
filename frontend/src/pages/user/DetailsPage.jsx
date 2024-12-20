import React, { useEffect } from "react";
import { Row, Col, Table, Image, ButtonGroup, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Initial } from "../../redux/slice/cartSlice";
import { getProduct } from "../../redux/thunk/productThunk";
import { addToCart } from "../../redux/thunk/cartThunk";
import Header from "../../components/Header";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function DetailsPage() {
  const { Id } = useParams();
  const dispatch = useDispatch();
  const { current_user } = useSelector((state) => state.user);
  const { product } = useSelector((state) => state.product);
  const { loading, success, error } = useSelector((state) => state.cart);

  function handleAddToCart() {
    if (Object.keys(current_user).length) {
      dispatch(
        addToCart({
          product: {
            name: product.name,
            image: product.image,
            price: product.price,
          },
          userId: current_user.Id,
          productId: product.Id,
        })
      );
    }
  }

  useEffect(() => {
    dispatch(getProduct(Id));
    return () => dispatch(Initial());
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Row className="p-3">
        <Col className="p-4 align-items-center" md={4} lg={6}>
          <Image src={"http://127.0.0.1:8000/" + product.image} fluid rounded />
        </Col>
        <Col className="p-4" md={4} lg={6}>
          <Row>
            <Table striped bordered>
              <tbody>
                <tr>
                  <td>
                    <h4>{product.name}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Price : " + product.price}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <section>{product.description}</section>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <Table striped bordered>
              <tbody>
                <tr>
                  <td>Area</td>
                  <td>{product.area}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>{product.rating}</td>
                </tr>
                <tr>
                  <td>Available</td>
                  <td>{product.available ? "True" : "False"}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <ButtonGroup className="d-flex">
                      <Button variant="dark" onClick={() => handleAddToCart()}>
                        Add to Wishlist
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
          {!Object.keys(current_user).length ? (
            <Message
              variant={"warning"}
              message={"Login to Add items to cart"}
            />
          ) : error ? (
            <Message variant={"danger"} message={"Error loading product"} />
          ) : loading ? (
            <Loader />
          ) : success ? (
            <Message
              variant={"success"}
              message={"Successfully added product to cart"}
            />
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default DetailsPage;
