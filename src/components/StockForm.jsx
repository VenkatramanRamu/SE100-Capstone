import React, { useState, useContext } from "react";
import { StockContext } from "../context/StockContext";  // Path to context

const StockForm = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  // State for error message

  const { addStock } = useContext(StockContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stockSymbol || !quantity || !purchasePrice) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const error = await addStock({
      stockSymbol,
      quantity: parseInt(quantity),
      purchasePrice: parseFloat(purchasePrice),
    });

    if (error) {
      setErrorMessage(error);  // Set error message if invalid symbol
    } else {
      setErrorMessage("");  // Clear error message on success
      setStockSymbol("");
      setQuantity("");
      setPurchasePrice("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Stock Symbol"
          className="border px-2 py-1 mr-2"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border px-2 py-1 mr-2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Purchase Price"
          className="border px-2 py-1 mr-2"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add Stock
        </button>
      </form>

      {/* Error message display */}
      {errorMessage && (
        <div className="text-red-500">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default StockForm;
