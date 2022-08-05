import "./App.css";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Product from "./components/Product";
import CartDropdown from "./components/CartDropdown";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <div>
        <Nav />
        <CartDropdown />
        <Routes>
          <Route path="/" exact element={<Dashboard />}></Route>
          <Route path="/product/:id" exact element={<Product />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
