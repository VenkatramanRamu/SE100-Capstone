// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { StockContext } from "../context/StockContext";  

const StockForm = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  
  const { addStock } = useContext(StockContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!stockSymbol || !quantity || !purchasePrice) {
      return;
    }

    addStock({
      stockSymbol,
      quantity: parseInt(quantity),
      purchasePrice: parseFloat(purchasePrice),
    });

    setStockSymbol("");
    setQuantity("");
    setPurchasePrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Enter Stock Symbol"
        className="border px-2 py-1 mr-2"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
      />
      <input
        type="number"
        placeholder="Enter Quantity"
        className="border px-2 py-1 mr-2"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Purchase Price per stock"
        className="border px-2 py-1 mr-2"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Stock
      </button>
    </form>
  );
};

export default StockForm;
