import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <DefaultLayout>
      <main className="manPageContent">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav aria-label="breadcrumb" className="themeBreadCrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                  {/* <li className="breadcrumb-item active" aria-current="page">
                  Data
                </li> */}
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <section className="newDesignSec">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="secHead">
                  <h2 className="secTitle colorBlue">Contact Us</h2>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="address">
                  <span>FB GROUP:</span>{" "}
                  <a
                    href="https://www.facebook.com/sweetnsassydesigns18/"
                    target="_blank"
                  >
                    Sweet & Sassy Designs
                  </a>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="address">
                  <span>LOCATION: </span>
                  <span>Arkansas, USA</span>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="address">
                  <span>EMAIL:</span>{" "}
                  <a href="mailto:sweetnsassyblanks@gmail.com">
                    sweetnsassyblanks@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="newDesignSec">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="secHead">
                  <h2 className="secTitle colorBlue">Get in touch with us</h2>
                  <p className="secDescription">
                    Please allow up to 72 hours for us to reply.
                  </p>
                </div>
              </div>
              <div className="col-md-7">
                <form className="webForm">
                  <div className="webFormDiv">
                    <label htmlFor="inputName" className="form-label">
                      Your Name (required)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      required
                    />
                  </div>
                  <div className="webFormDiv">
                    <label htmlFor="inputEmail" className="form-label">
                      Your Email (required)
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      required
                    />
                  </div>
                  <div className="webFormDiv">
                    <label htmlFor="inputSubject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputSubject"
                      required
                    />
                  </div>
                  <div className="webFormDiv">
                    <label htmlFor="inputMessage" className="form-label">
                      Subject
                    </label>
                    <textarea
                      className="form-control"
                      placeholder=""
                      id="inputMessage"
                      rows={8}
                    ></textarea>
                  </div>
                  <button className="themeBtn">Send</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default ContactUs;
