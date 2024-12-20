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
import { useDispatch } from "react-redux";
import { getAllUsersWithSearch } from "../redux/thunk/userThunk";
import { getAllProductsWithSearch } from "../redux/thunk/productThunk";

function AdminHeader() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  function handleSearch() {
    setQuery("");
    if (location.pathname === "/admin/products") {
      dispatch(getAllProductsWithSearch(query));
      dispatch(Initial());
    } else dispatch(getAllUsersWithSearch(query));
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <NavLink
              to="/admin"
              className={"text-decoration-none"}
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "gray",
                };
              }}
            >
              <i className="bi bi-person-gear px-2" />
              Admin
            </NavLink>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Form
              className={
                location.pathname === "/admin/products" ||
                location.pathname === "/admin/users"
                  ? "px-2 visible"
                  : "px-2 invisible"
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
            <NavLink
              to="/profile"
              className={"px-3 text-decoration-none align-self-center"}
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "gray",
                };
              }}
            >
              <i className="bi bi-person-fill px-1" />
              User
            </NavLink>
            <NavLink
              to="/"
              className={"text-decoration-none align-self-center"}
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "gray",
                };
              }}
            >
              <i className="bi bi-shop-window px-1" />
              Home
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default AdminHeader;
