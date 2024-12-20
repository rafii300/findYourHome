import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div className="p-2 d-flex flex-row justify-content-center">
      <Spinner animation="border" />;
    </div>
  );
}

export default Loader;
