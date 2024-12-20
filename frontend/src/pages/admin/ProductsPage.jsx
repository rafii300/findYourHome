import React, { useEffect, useState } from "react";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Initial } from "../../redux/slice/productSlice";
import {
  getAllProducts,
  getAllProductsWithSearch,
  deleteProduct,
} from "../../redux/thunk/productThunk";
import AdminHeader from "../../components/AdminHeader";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function ProductsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current_user } = useSelector((state) => state.user);
  const { products, pages, loading, error } = useSelector(
    (state) => state.product
  );

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("DESC");
  const [by, setBy] = useState("price");
  const [page, setPage] = useState(1);

  function handleSearch() {
    setQuery("");
    dispatch(getAllProductsWithSearch(query, sort, by, 1));
    dispatch(Initial());
  }

  useEffect(() => {
    dispatch(getAllProducts(page, sort, by));
    return () => dispatch(Initial());
  }, [page, sort, by]);

  if (!Object.keys(current_user).length) return <Navigate to="/login" />;
  else if (!current_user.is_superuser) return <Navigate to="/" />;
  else {
    return (
      <div className="d-flex flex-column min-vh-100">
        <AdminHeader />
        <Row>
          <h2 className="p-2 text-center">Search Products</h2>
          <Row className="justify-content-center">
            <Col md={5}>
              <Form className="py-3" onSubmit={(e) => e.preventDefault()}>
                <Form.Control
                  type="text"
                  value={query}
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Form>
            </Col>
            <Col
              md={1}
              className="d-flex justify-content-center align-items-center"
            >
              <Button
                type="submit"
                variant="dark"
                onClick={() => handleSearch()}
              >
                <i className="bi bi-search" />
              </Button>
            </Col>
          </Row>
          <hr />
        </Row>
        <Row className="justify-content-center">
          <Row md={10} className="p-2">
            <Col md={6}>
              <h1>Products</h1>
            </Col>
            <Col md={2}>
              <Form.Control
                as="select"
                value={by}
                onChange={(e) => setBy(e.target.value)}
              >
                <option value="price">Price</option>
                <option value="Id">Id</option>
              </Form.Control>
            </Col>
            <Col md={2}>
              <Form.Control
                as="select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="DESC">DESC</option>
                <option value="ASC">ASC</option>
              </Form.Control>
            </Col>
            <Col md={2}>
              <Button
                type="submit"
                variant="dark"
                onClick={() => navigate("/admin/create-product")}
              >
                Create Product
              </Button>
            </Col>
          </Row>
          {products.length ? (
            error ? (
              <Message variant={"danger"} message={"Error loading products"} />
            ) : loading ? (
              <Loader />
            ) : (
              <Row md={10} className="px-3">
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th className="text-center">ID</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Rating</th>
                      <th className="text-center">Area</th>
                      <th className="text-center">Available</th>
                      <th className="text-center">Update</th>
                      <th className="text-center">Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => (
                      <tr key={product.Id}>
                        <td className="text-center">{product.Id}</td>
                        <td className="text-center">
                          <strong>{product.name}</strong>
                        </td>
                        <td className="text-center">{product.price}</td>
                        <td className="text-center">{product.rating}</td>
                        <td className="text-center">{product.area}</td>
                        <td className="text-center">
                          {product.available ? "True" : "False"}
                        </td>
                        <td className="text-center">
                          <Button
                            type="submit"
                            variant="secondary"
                            onClick={() =>
                              navigate("/admin/update-product/", {
                                state: product,
                              })
                            }
                          >
                            Update
                          </Button>
                        </td>
                        <td className="text-center">
                          <Button
                            type="submit"
                            variant="danger"
                            onClick={() => dispatch(deleteProduct(product.Id))}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            )
          ) : (
            <Row md={10} className="py-3">
              <Message variant={"warning"} message={"No products to show"} />
            </Row>
          )}
        </Row>
        <Footer pages={pages} page={page} setPage={setPage} />
      </div>
    );
  }
}

export default ProductsPage;
