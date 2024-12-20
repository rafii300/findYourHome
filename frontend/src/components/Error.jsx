import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Error() {
  return (
    <div className="vh-100">
      <Header />
      <div className="h-75 d-flex flex-column align-items-center justify-content-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <section className="text-secondary">
          Go Back to
          <Link className="px-1 text-secondary" to="/">
            home
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Error;
