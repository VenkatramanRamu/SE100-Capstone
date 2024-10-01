import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StockProvider } from "./context/StockContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StockProvider>
      <App/>
    </StockProvider>
  </React.StrictMode>
);
