import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

export const StockContext = createContext();

const apiKey = "3YN1LH0DG485K63G";  

export const StockProvider = ({ children }) => {
  const [stockList, setStockList] = useState([]);

  const fetchStockPrice = useCallback(async (symbol) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
        return parseFloat(data["Global Quote"]["05. price"]);
      } else if (data["Note"]) {
        return "API limit reached. Please wait and try again.";
      } else {
        return `Invalid stock symbol: ${symbol}.`;
      }
    } catch (error) {
      console.error("Error fetching stock price:", error); 
      return "Error fetching stock price. Please try again.";
    }
  }, [apiKey]);

  const addStock = async (newStock) => {
    const currentPrice = await fetchStockPrice(newStock.stockSymbol);

    if (typeof currentPrice === "string") {
      return currentPrice;  
    } else {
      setStockList([...stockList, { ...newStock, currentPrice }]);
      return null;
    }
  };

  return (
    <StockContext.Provider value={{ stockList, addStock }}>
      {children}
    </StockContext.Provider>
  );
};

StockProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
