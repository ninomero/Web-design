import './App.css'

// css 読み込み
import "./App.css";
import "./assets/reset.css";
import "./assets/style.css";

// theme
import { theme } from "./assets/theme.ts";
import { ThemeProvider } from "@emotion/react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ContextProvider } from './contexts/UserContext.js';
import Header from './components/Header/Header.js';

function App() {
  console.log("Appをレンダリング");
  return (
    <>
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <Router>
            <Header />
          </Router>
        </ContextProvider>
      </ ThemeProvider>
    </>
  )
}

export default App
