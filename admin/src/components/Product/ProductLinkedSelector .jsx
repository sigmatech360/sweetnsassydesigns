import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import api from "../../api/axios";
import { FaX } from "react-icons/fa6";

export const ProductLinkedSelector = ({ formData, setFormData, formKey, data =[] }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [linkedProducts, setLinkedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef(null);

  // ⏳ Debounce state
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // If less than 3 chars → don't hit API
    if (value.length < 3) {
      setResults([]);
      return;
    }
    setIsLoading(true);

    // Clear previous timeout
    if (typingTimeout) clearTimeout(typingTimeout);

    // Debounce 400ms
    setTypingTimeout(
      setTimeout(() => {
        fetchProducts(value);
      }, 400)
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    if (results.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [results]);

  const fetchProducts = async (keyword) => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.post(
        `/api/product/search`,
        { search: keyword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("res", res);
      setIsLoading(false);

      setResults(res.data.data);
    } catch (error) {
      console.error("Search API error:", error);
      setIsLoading(false);
    }
  };

  // Add selected product
  const addLinkedProduct = (product) => {
    // Prevent duplicates
    if (linkedProducts.find((item) => item.id === product.id)) {
      return;
    }

    setLinkedProducts([
      ...linkedProducts,
      { id: product.id, title: product.title },
    ]);

    // Clear results after selecting
    setResults([]);
    setSearch("");
  };

  // Remove linked product
  const removeLinkedProduct = (id) => {
    setLinkedProducts(linkedProducts.filter((p) => p.id !== id));
  };

  useEffect(() => {

    setFormData({
      ...formData,
      [formKey]: linkedProducts,
    });
  }, [linkedProducts]);

  useEffect(() => {
    // Initialize linked products from formData
    if (data && Array.isArray(data) && data.length > 0) {
      setLinkedProducts(data);
    }
  }, [data]);

  return (
    <div className="col-sm-8 col-10">
      {/* <label>Related Products</label> */}
      <input
        type="text"
        value={search}
        placeholder="Search products..."
        onChange={handleSearch}
        className="w-100  p-2 border rounded"
      />

      {isLoading && <div className="search-dropdown p-3">Loading...</div>}

      {/* Search Results Dropdown */}
      {results.length > 0 && (
        <ul className="search-dropdown" ref={resultsRef}>
          {results.map((product) => (
            <li key={product.id} onClick={() => addLinkedProduct(product)}>
              {product.title}
            </li>
          ))}
        </ul>
      )}

      {/* Selected Linked Products */}
      <div className="selected-products mt-3">
        {linkedProducts.map((p) => (
          <span key={p.id} className="badge position-relative bg-primary">
            {p.title}
            <span
              className="delete-icon"
              onClick={() => removeLinkedProduct(p.id)}
            >
              <FaX size={8} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductLinkedSelector;
