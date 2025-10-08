import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const nameMap = {
    "need-sheets": "Need Sheets",
    "contact-us": "Contact Us",
    "my-account": "My Account",
  };

  return (
    <section className="breadcrumb">
      <div className="container">
        <div className="col-md-12">
          <nav aria-label="breadcrumb" className="themeBreadCrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>

              {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;

                // convert slug → readable text
                let label = nameMap[value] || value.replace(/-/g, " ");
                label = label.charAt(0).toUpperCase() + label.slice(1);

                return isLast ? (
                  <li
                    key={to}
                    className="breadcrumb-item active"
                    aria-current="page"
                  >
                    {label}
                  </li>
                ) : (
                  <li key={to} className="breadcrumb-item">
                    <Link to={to}>{label}</Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumbs;
