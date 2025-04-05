import React from "react";
import ReactDOM from "react-dom/client";  // Correct import for React 18
import App from "./App";
import "./styles.css"; // Make sure styles.css exists

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

