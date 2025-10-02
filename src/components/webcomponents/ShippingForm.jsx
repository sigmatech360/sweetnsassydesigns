import React from 'react'

const ShippingForm = () => {
  return (
    <div className="form-container">
      <h2>Shipping Address Form</h2>
      <form>
        <input type="text" placeholder="Shipping Name" />
        <input type="text" placeholder="Shipping Street" />
        <button type="submit">Save Shipping Address</button>
      </form>
    </div>
  )
}

export default ShippingForm