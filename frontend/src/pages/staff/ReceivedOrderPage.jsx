import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Initial } from "../../redux/slice/orderSlice";
import {
  getAllOrders,
  clearPendingOrder,
  deleteOrderItem,
} from "../../redux/thunk/orderThunk";
import AdminHeader from "../../components/AdminHeader";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function ReceivedOrderPage() {
  const dispatch = useDispatch();
  const { orders, pages, loading, error } = useSelector((state) => state.order);
  const { current_user } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllOrders(page, true));
    return () => dispatch(Initial());
  }, [page]);

  if (!Object.keys(current_user).length) return <Navigate to="/login" />;
  else if (!current_user.is_admin) return <Navigate to="/" />;
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
                <h1 className="py-3"> Pending Orders</h1>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th className="text-center">ID</th>
                      <th className="text-center">User</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Date</th>
                      <th className="text-center">Complete</th>
                      <th className="text-center">Terminate</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.Id}>
                        <td className="text-center">{order.Id}</td>
                        <td className="text-center">{order.userId}</td>
                        <td className="text-center">{order.price}</td>
                        <td className="text-center">{order.date}</td>
                        <td
                          onClick={() => {
                            dispatch(clearPendingOrder(order.Id));
                          }}
                          className="text-center text-success"
                        >
                          Deliver
                        </td>
                        <td
                          onClick={() => {
                            dispatch(deleteOrderItem(order.Id));
                          }}
                          className="text-center text-danger"
                        >
                          Delete
                        </td>
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

export default ReceivedOrderPage;
