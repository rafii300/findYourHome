import React from "react";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminHeader from "../../components/AdminHeader";
import Footer from "../../components/Footer";

function AdminPage() {
  const navigate = useNavigate();
  const { current_user } = useSelector((state) => state.user);

  if (!Object.keys(current_user).length) return <Navigate to="/login" />;
  else if (!current_user.is_superuser) return <Navigate to="/" />;
  else {
    return (
      <div className="d-flex flex-column min-vh-100">
        <AdminHeader />
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="py-3 text-center">Admin Pages</h1>
            <ListGroup className="py-2">
              <ListGroup.Item className="bg-light">
                <Row>
                  <Col md={8} as="h3" className="text-center">
                    Pages
                  </Col>
                  <Col md={4} as="h3" className="text-center">
                    Details
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col
                    md={8}
                    as="h6"
                    className="d-flex flex-row justify-content-center align-items-center"
                  >
                    Home List
                  </Col>
                  <Col md={4} className="d-flex justify-content-center">
                    <Button
                      variant="dark"
                      onClick={() => navigate("/admin/products")}
                    >
                      Show
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col
                    md={8}
                    as="h6"
                    className="d-flex flex-row justify-content-center align-items-center"
                  >
                    User List
                  </Col>
                  <Col md={4} className="d-flex justify-content-center">
                    <Button
                      variant="dark"
                      onClick={() => navigate("/admin/users")}
                    >
                      Show
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col
                    md={8}
                    as="h6"
                    className="d-flex flex-row justify-content-center align-items-center"
                  >
                    Order List
                  </Col>
                  <Col md={4} className="d-flex justify-content-center">
                    <Button
                      variant="dark"
                      onClick={() => navigate("/admin/orders")}
                    >
                      Show
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

export default AdminPage;
