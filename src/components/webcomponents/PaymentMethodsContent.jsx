import React from 'react'

const PaymentMethodsContent = () => {
  return (
    <>
      <div className="payment-tab">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="payment-tab-content">
                <p>No saved methods found.</p>
              </div>
              <div className="payment-tab-btn">
                <button>Add Payment Method</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentMethodsContent