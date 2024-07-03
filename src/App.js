import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ThemeProvider from "./theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>HI</BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
