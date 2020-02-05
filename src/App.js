import React from "react";
import HomePage from "./pages/HomePage";
import { Router } from "@reach/router";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  return (
    <Router>
      <HomePage path="/" />
      <ConfirmationPage path="/confirmed" />
    </Router>
  );
}

export default App;
