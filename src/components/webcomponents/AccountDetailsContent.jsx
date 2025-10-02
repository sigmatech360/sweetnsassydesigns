import React from "react";

const AccountDetailsContent = () => {
  return (
    <>
      <div className="account-details-tab">
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-12">
              <div className="account-details-notice">
                <p>
                  Your account with Sweet N Sassy Designs is using a temporary
                  password. We emailed you a link to change your password.
                </p>
              </div>
            </div> */}
            <div className="col-lg-12">
              <div className="account-detail-tab-form">
                <form action="">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="account-input-field">
                        <label htmlFor="">First Name <span className="colorBlue">*</span></label>
                        <input type="text" name="" id="" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="account-input-field">
                        <label htmlFor="">Last Name <span className="colorBlue">*</span></label>
                        <input type="text" name="" id="" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="account-input-field">
                        <label htmlFor="">Display Name <span className="colorBlue">*</span></label>
                        <input type="text" name="" id="" value='admin'/>
                        <span>
                          This will be how your name will be displayed in the
                          account section and in reviews
                        </span>
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="col-lg-12">
                      <div className="account-input-field low-margin-fields">
                        <label htmlFor="">Email address <span className="colorBlue">*</span></label>
                        <input type="text" name="" id="" value="test@test.com" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="account-input-field low-margin-fields">
                      <p>Password change</p>
                      <label htmlFor="">
                        Current password (leave blank to leave unchanged)
                      </label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="account-input-field low-margin-fields">
                      <label htmlFor="">New password (leave blank to leave unchanged)</label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                   <div className="col-lg-12">
                    <div className="account-input-field low-margin-fields">
                      <label htmlFor="">Confirm new password</label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="account-detail-savebtn">
                      <button>Save Changes</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetailsContent;
