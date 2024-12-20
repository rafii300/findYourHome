import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Initial } from "../redux/slice/productSlice";
import {
  getAllProducts,
  getAllProductsWithSearch,
} from "../redux/thunk/productThunk";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { current_user } = useSelector((state) => state.user);

  const [query, setQuery] = useState("");

  function handleSearch() {
    setQuery("");
    dispatch(getAllProductsWithSearch(query, "ASC", "Id"));
    dispatch(Initial());
  }

  return (
    <Row>
      <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <NavLink
              to="/"
              className={"text-decoration-none"}
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "gray",
                };
              }}
              onClick={() => dispatch(getAllProducts(1, "ASC", "Id"))}
            >
              <i className="bi bi-shop-window px-2" />
              Shop
            </NavLink>
          </Navbar.Brand>

          <Nav className="ml-auto">
            <Form
              className={
                location.pathname === "/" ? "px-2 visible" : "px-2 invisible"
              }
              onSubmit={(e) => e.preventDefault()}
            >
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    value={query}
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    type="submit"
                    variant="light"
                    onClick={() => handleSearch()}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
            {Object.keys(current_user).length ? (
              current_user.is_admin ? (
                <NavLink
                  className={"text-decoration-none align-self-center"}
                  to="/stuff"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "white" : "gray",
                    };
                  }}
                >
                  <i className="bi bi-person-gear px-1" />
                  Staff
                </NavLink>
              ) : current_user.is_superuser ? (
                <NavLink
                  className={"text-decoration-none align-self-center"}
                  to="/admin"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "white" : "gray",
                    };
                  }}
                >
                  <i className="bi bi-person-gear px-1" />
                  Admin
                </NavLink>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            <NavLink
              to="/cart"
              className={"px-3 text-decoration-none align-self-center"}
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "gray",
                };
              }}
            >
              <i className="bi bi-cart px-1" />
              Cart
            </NavLink>
            {Object.keys(current_user).length ? (
              <NavLink
                to="/profile"
                className={"text-decoration-none align-self-center"}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "white" : "gray",
                  };
                }}
              >
                <i className="bi bi-person-fill px-1" />
                User
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={"text-decoration-none align-self-center"}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "white" : "gray",
                  };
                }}
              >
                <i className="bi bi-box-arrow-in-right px-1" />
                Login
              </NavLink>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </Row>
  );
}

export default Header;
