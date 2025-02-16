import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AuthComponent from "../src/features/auth/AuthComponent";
import { TaskAbortError } from "@reduxjs/toolkit";
import TasksComponent from "../src/features/auth/TaskComponent";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>
      <h1>The main content</h1>

      <Footer />
    </>
  );
}

export default App;
