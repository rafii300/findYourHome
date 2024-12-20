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
      <Row>
        <Row as="h4" className="justify-content-center">
          {product.name}
        </Row>
        <Row className="py-2">
          <Col md={6}>
            <i className="bi bi-star-half">
              <small>{product.rating}</small>
            </i>
          </Col>
          <Col md={6}>
            <i className="bi bi-geo-alt">
              <small>{product.area}</small>
            </i>
          </Col>
        </Row>

        <Row>
          <Col>
            Price : {product.price}
            <i className="bi bi-currency-dollar" />
          </Col>
        </Row>

        <Row className="py-2">
          <Button
            variant="dark"
            onClick={() => navigate(`/product/${product.Id}`)}
          >
            Check Details
          </Button>
        </Row>
      </Row>
    </Row>
  );
}

export default Product;
