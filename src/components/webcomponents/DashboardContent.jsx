import React from 'react'
import { useAuth } from '../../context/AuthContext';

const DashboardContent = () => {

   const { user, logout } = useAuth();

  return (
    <>
      <div className="dashboard-tab-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard-tab-txt">
                <h6>Your account with Sweet N Sassy Designs is using a temporary password. We emailed you a link to change your password.</h6>
                <p>Hello <span> {user?.email} </span>(not <span>user@user.com</span>? <button onClick={logout}>Logout</button>)</p>
                <p>From your account dashboard you can view your <a href="">recent orders</a>, manage your <a href="">shipping and billing addresses,</a> and <a href="">edit your password and account details.</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardContent