import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const MyPointsContent = () => {
  return (
    <>
      <section className="myppoints-tab-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="my-points-head">
                <h2>My Points</h2>
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="point-box-redeem">
                      <p>Points</p>
                      <h5>to redeem</h5>
                      <h3>0</h3>
                      <h4>total collected: 0</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="point-tabs-content">
                <div className="manage-points-tabs">
                  <Tabs>
                    <TabList>
                      <Tab>Manage Points</Tab>
                      <Tab>Title 2</Tab>
                    </TabList>

                    <TabPanel>
                      <div className="manage-point-tab-content">
                        <h3>Convert Points into a coupon code</h3>
                        <p>Do you want to share your Points? Create a coupon code and share it so it can be used</p> 
                        <span>At the moment you don't have enough Points to convert</span>                       
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <h2>Any content 2</h2>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPointsContent;
