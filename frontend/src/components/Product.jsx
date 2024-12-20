import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Product({ product }) {
  const navigate = useNavigate();

  return (
    <Row className="py-2 justify-content-center border shadow-sm rounded">
      <Row className="my-2 text-center">
        <Link
          className="text-dark text-decoration-none"
          to={`product/${product.Id}`}
        >
          <Image
            src={"http://127.0.0.1:8000/" + product.image}
            width="50%"
            fluid
          />
        </Link>
      </Row>
      <Row as="h5" className="my-2 justify-content-center">
        {product.name}
      </Row>
      <Row className="mb-2">
        <Col md={8}>
          <i className="bi bi-currency-dollar">{product.price}</i>
        </Col>
        <Col md={4}>
          <i className="bi bi-star-half">{product.rating}</i>
        </Col>
      </Row>

      <Row className="mb-2">
        <Button
          variant="dark"
          onClick={() => navigate(`/product/${product.Id}`)}
        >
          Details
        </Button>
      </Row>
    </Row>
  );
}

export default Product;
