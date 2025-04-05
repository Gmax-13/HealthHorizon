import React from "react";
import ReactDOM from "react-dom/client";  // Correct import for React 18
import App from "./App";
import "./styles.css"; // Make sure styles.css exists
import { SignupProvider } from "./SignupContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SignupProvider>
      <App />
    </SignupProvider>,
    document.getElementById("root")
  </React.StrictMode>
);

