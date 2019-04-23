import React from "react";
import ReactDOM from "react-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { HashRouter, Switch, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <div className="container p-5">
        <Switch>
          <Route path="/clients/:id" component={Customer} />
          <Route path="/clients" component={Customers} />
          <Route path="/factures" component={Home} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <ToastContainer position="bottom-left" />
    </HashRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
