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
    brand: product.brand,
    category: product.category,
    countInStock: product.countInStock,
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
    formData.append("brand", state.brand);
    formData.append("category", state.category);
    formData.append("countInStock", Number(state.countInStock));
    formData.append("rating", Math.round(Math.random() * 5));

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

              <Form.Group as={Row} className="p-2" controlId="brand">
                <Form.Label column sm="2" className="fw-bold">
                  Brand
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={state.brand}
                    onChange={(e) =>
                      setState({ ...state, brand: e.target.value })
                    }
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="p-2" controlId="countinstock">
                <Form.Label column sm="2" className="fw-bold">
                  Stock
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    placeholder="Enter stock"
                    value={state.countInStock}
                    onChange={(e) =>
                      setState({ ...state, countInStock: e.target.value })
                    }
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="p-2" controlId="category">
                <Form.Label column sm="2" className="fw-bold">
                  Category
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={state.category}
                    onChange={(e) =>
                      setState({ ...state, category: e.target.value })
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
