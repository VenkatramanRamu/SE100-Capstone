import { useContext } from "react";
import { StockContext } from "./context/StockContext";  
import StockForm from "./components/StockForm";

const App = () => {
  const { stockList } = useContext(StockContext);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finance Dashboard</h1>

      {/* Stock Form */}
      <StockForm />

      {/* Stock List */}
      <h2 className="text-xl font-bold">Stock List</h2>
      {stockList.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <ul>
          {stockList.map((stock, index) => {
            const currentPrice = stock.currentPrice ? stock.currentPrice.toFixed(2) : "Unavailable";
            const profitLoss = stock.currentPrice
              ? (stock.currentPrice - stock.purchasePrice) * stock.quantity
              : 0;

            const formattedProfitLoss =
              profitLoss > 0 ? `+${profitLoss.toFixed(2)}` : profitLoss.toFixed(2);

            const profitLossColor = profitLoss >= 0 ? "text-green-500" : "text-red-500";

            return (
              <li key={index} className="mb-4 p-4 border rounded bg-gray-50">
                <div><strong>Symbol:</strong> {stock.stockSymbol}</div>
                <div><strong>Quantity:</strong> {stock.quantity}</div>
                <div><strong>Purchase Price:</strong> ${stock.purchasePrice}</div>
                <div><strong>Current Price:</strong> ${currentPrice}</div>
                <div className={profitLossColor}>
                  <strong>Profit/Loss:</strong> ${formattedProfitLoss}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default App;
