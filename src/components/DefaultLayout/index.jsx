import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "../Breadcrumbs";

const DefaultLayout = (props) => {
  return (
    <>
      {/* <Header />
      {props.children} */}
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Header />
        <main className="manPageContent flex-grow-1">
            <Breadcrumbs />
          {props.children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
