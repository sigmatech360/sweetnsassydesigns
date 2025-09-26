import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const DefaultLayout = (props) => {
  return (
    <>
      {/* <Header />
      {props.children} */}
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Header />
        <div className="flex-grow-1">{props.children}</div>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
