import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

// Create StockContext
export const StockContext = createContext();

// AlphaVantage API Key
const apiKey = "61O9Q36XBXF6BBFC";  

// Create StockProvider component to wrap around the app
export const StockProvider = ({ children }) => {
  const [stockList, setStockList] = useState([]);

  // Memoized function to fetch stock price
  const fetchStockPrice = useCallback(async (symbol) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      );
      const data = await response.json();

      // Check if the symbol is valid by verifying if the data contains the necessary fields
      if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
        return parseFloat(data["Global Quote"]["05. price"]);
      } else if (data["Note"]) {
        // API limit reached
        alert("API limit reached. Please wait and try again.");
        return null;
      } else {
        // Invalid symbol or missing data
        console.error(`Invalid symbol: ${symbol}. API response:`, data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching stock price:", error);
      return null;
    }
  }, [apiKey]);

  // Function to add stock with fetched current price
  const addStock = async (newStock) => {
    const currentPrice = await fetchStockPrice(newStock.stockSymbol);

    if (currentPrice !== null) {
      // Add the stock to the list only if a valid price is returned
      setStockList([...stockList, { ...newStock, currentPrice }]);
    } else {
      // No alert shown if symbol is invalid, simply ignore it
      console.log(`Invalid stock symbol: ${newStock.stockSymbol} was ignored.`);
    }
  };

  return (
    <StockContext.Provider value={{ stockList, addStock }}>
      {children}
    </StockContext.Provider>
  );
};

// PropTypes validation
StockProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
