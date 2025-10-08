import React from "react";
import DefaultLayout from "../../components/DefaultLayout";

const NeedSheets = () => {
  return (
    <DefaultLayout>
        <section className="newDesignSec">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="secHead">
                  <h2 className="secTitle colorBlue">Need Sheets</h2>
                </div>
              </div>
              <div className="col-md-12">
                <div className="needSheetsContent">
                  <h5>
                    “Need Sheets” are full-size printables that include
                    recommended fabrics for your towel to look just like ours.
                    This is made at an 8.5×11 size so you can print it, use a
                    3-hole punch to punch holes and put it in a binder for
                    reference!
                  </h5>
                  <h5>
                    Feel free to download these as you need. We will have all
                    designs need sheets available but are working on the newest
                    first. Once you click on the design of your choice, simply
                    click on the Needs Sheet under the design photo and
                    Right-Click for Save Image As. Once you have saved your
                    Needs Sheet as a .jpg to your computer, you can print it at
                    any time!
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
    </DefaultLayout>
  );
};

export default NeedSheets;
