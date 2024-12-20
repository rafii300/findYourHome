import React from "react";
import { Row, Col, Pagination } from "react-bootstrap";

function Footer({ pages = 0, page = 0, setPage = null }) {
  const style = {
    color: "black",
    border: "1px solid",
    borderRadius: "3px",
    margin: "1px",
    fontWeight: "500",
  };

  return (
    <div className="mt-auto">
      {pages ? (
        <Row className="justify-content-center">
          <Col md="auto">
            <Pagination>
              <Pagination.Prev
                linkStyle={style}
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
              />
              {[...Array(pages).keys()].map((ele) => (
                <Pagination.Item
                  key={ele}
                  active={ele + 1 === page}
                  linkStyle={{
                    ...style,
                    color: ele + 1 === page ? "white" : "black",
                    backgroundColor: ele + 1 === page ? "black" : "white",
                  }}
                  onClick={() => setPage(ele + 1)}
                >
                  {ele + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                linkStyle={style}
                onClick={() => {
                  if (page < pages) setPage(page + 1);
                }}
              />
            </Pagination>
          </Col>
        </Row>
      ) : (
        <Row></Row>
      )}
      <Row>
        <Col className="p-2 bg-dark text-center text-white">
          ~ Copyright &copy; 2024 ~
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
