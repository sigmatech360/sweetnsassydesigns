import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardContent = ({ handleMenuClick }) => {

   const { user, logout } = useAuth();

  return (
    <>
      <div className="dashboard-tab-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard-tab-txt">
                {user?.password_changed === "0" && (<h6>Your account with Sweet N Sassy Designs is using a temporary password. We emailed you a link to change your password.</h6>)}
                <p>Hello <span>{user?.username} </span>(not <span>{user?.email}</span>? <button onClick={logout}>Logout</button>)</p>
                <p>From your account dashboard you can view your <Link onClick={() => handleMenuClick("orders")}>recent orders</Link>, manage your <Link onClick={() => handleMenuClick("addresses")}>shipping and billing addresses,</Link> and <Link onClick={() => handleMenuClick("accountDetails")}>edit your password and account details.</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardContent