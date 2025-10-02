import React from 'react'
import { Link } from 'react-router-dom'

const OrdersContent = () => {
  return (
    <>
      <div className="orders-tab-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="no-orders-content">
                <p>No order has been made yet.</p>
                <Link to=''>Browse Product</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrdersContent