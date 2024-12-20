import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Initial } from "../../redux/slice/productSlice";
import { updateProduct } from "../../redux/thunk/productThunk";
import AdminHeader from "../../components/AdminHeader";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

function UpdateProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.product);
  const { current_user } = useSelector((state) => state.user);
  const product = location.state;

  const initialState = {
    name: product.name,
    description: product.description,
    price: product.price,
    image: "",
    area: product.area,
    rating: product.rating,
    available: product.available,
  };

  const [state, setState] = useState(initialState);
  const [buttonPressed, setButtonPressd] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (state.image) {
      formData.append("image", state.image);
    }
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("price", Number(state.price));
    formData.append("area", state.area);
    formData.append("available", state.available === "true" ? true : false);
    formData.append("rating", state.rating % 11);

    dispatch(updateProduct(product.Id, formData));
    setButtonPressd(true);
  };

  useEffect(() => {
    if (buttonPressed) {
      setTimeout(() => {
        if (success) {
          navigate("/admin/products");
        }
      }, 1000);
    }
    return () => {
      if (success) dispatch(Initial());
    };
  }, [success, buttonPressed]);

  if (!Object.keys(current_user).length) return <Navigate to="/login" />;
  else if (!current_user.is_superuser) return <Navigate to="/" />;
  else {
    return (
      <div className="d-flex flex-column min-vh-100">
        <AdminHeader />
        <Row className="justify-content-center px-5 py-3">
          <center>
            <h1 className="py-3">Update Product</h1>
          </center>
          <Col md={6} className="py-2">
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group as={Row} className="p-2" controlId="name">
                <Form.Label column sm="2" className="fw-bold">
                  Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="p-2" controlId="price">
                <Form.Label column sm="2" className="fw-bold">
                  Price
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={state.price}
                    onChange={(e) =>
                      setState({ ...state, price: e.target.value })
                    }
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="p-2" controlId="area">
                <Form.Label column sm="2" className="fw-bold">
                  Area
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Enter area"
                    value={state.area}
                    onChange={(e) =>
                      setState({ ...state, area: e.target.value })
                    }
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="p-2" controlId="available">
                <Form.Label column sm="2" className="fw-bold">
                  Available
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder={state.available ? "True" : "False"}
                    value={state.available}
                    onChange={(e) =>
                      setState({ ...state, available: e.target.value })
                    }
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="p-2" controlId="rating">
                <Form.Label column sm="2" className="fw-bold">
                  Rating
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    placeholder="Enter rating"
                    value={state.rating}
                    onChange={(e) =>
                      setState({ ...state, rating: e.target.value })
                    }
                  ></Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </Col>
          <Col md={6} className="py-2">
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group className="p-2" controlId="image">
                <Form.Label className="fw-bold">Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Enter image"
                  onChange={(e) =>
                    setState({ ...state, image: e.target.files[0] })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group className="p-2" controlId="description">
                <Form.Label className="fw-bold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter description"
                  value={state.description}
                  onChange={(e) =>
                    setState({ ...state, description: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          {error ? (
            <Message
              className="pt-2"
              variant={"danger"}
              message={"Could not update product"}
            />
          ) : loading ? (
            <Loader />
          ) : success ? (
            <Message
              className="pt-2"
              variant={"success"}
              message={"Successfully updated product"}
            />
          ) : (
            <></>
          )}
          <center className="py-3">
            <Button
              onClick={() => handleSubmit()}
              type="submit"
              variant="warning"
            >
              Update
            </Button>
          </center>
        </Row>
      </div>
    );
  }
}

export default UpdateProductPage;
