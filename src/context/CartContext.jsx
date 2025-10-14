import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

 const addToCart = (product, quantity = 1) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItems = prevItems
        .map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        .filter((item) => item.quantity > 0); 
      return updatedItems;
    } else {
      return [...prevItems, { ...product, quantity }];
    }
  });
};


  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
