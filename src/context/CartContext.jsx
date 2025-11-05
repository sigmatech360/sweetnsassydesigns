import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);

 const addToCart = (product, quantity = 1) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItems = prevItems
        .map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        .filter((item) => item.quantity > 0); 
        toast.info("Updated product quantity");
      return updatedItems;
    } else {
      toast.success("Added to cart");
      return [...prevItems, { ...product, quantity }];
    }
  });
};


   const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const product = prevItems.find((item) => item.id === id);
      if (product) {
        toast.error(`${product.name || "Product"} removed from cart`);
      }
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
