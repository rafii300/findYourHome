import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Initial } from "../../redux/slice/orderSlice";
import { getAllOrders } from "../../redux/thunk/orderThunk";
import AdminHeader from "../../components/AdminHeader";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, pages, loading, error } = useSelector((state) => state.order);
  const { current_user } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllOrders(page, false));
    return () => dispatch(Initial());
  }, [page]);

  if (!Object.keys(current_user).length) return <Navigate to="/login" />;
  else if (!current_user.is_superuser) return <Navigate to="/" />;
  else {
    return (
      <div className="d-flex flex-column min-vh-100">
        <AdminHeader />
        <Row className="justify-content-center">
          {orders.length ? (
            error ? (
              <Message variant={"danger"} message={"Error loading orders"} />
            ) : loading ? (
              <Loader />
            ) : (
              <Col md={10}>
                <h1 className="py-3">Orders</h1>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th className="text-center">ID</th>
                      <th className="text-center">User</th>
                      <th className="text-center">Products</th>
                      <th className="text-center">Items</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Method</th>
                      <th className="text-center">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.Id}>
                        <td className="text-center">{order.Id}</td>
                        <td className="text-center">{order.userId}</td>
                        <td className="text-center">{order.products}</td>
                        <td className="text-center">{order.items}</td>
                        <td className="text-center">{order.price}</td>
                        <td className="text-center">{order.method}</td>
                        <td className="text-center">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            )
          ) : (
            <Col md={10} className="py-3">
              <Message variant={"warning"} message={"No order is made yet"} />
            </Col>
          )}
        </Row>
        <Footer pages={pages} page={page} setPage={setPage} />
      </div>
    );
  }
}

export default OrdersPage;
