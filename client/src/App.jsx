import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import { useEffect } from "react";

const App = () => {
 
  // let cart = JSON.parse(localStorage.getItem("products" ));
  // useEffect(() => {

  //   if (!cart) { localStorage.setItem("products", []);
      
  //   }
   
  // }, [cart])
  const user = useSelector((state) => state.userReducer.currentUser);
  const auth = useSelector((state) => state.userReducer.isAuth);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id" render={(rest) => <Product {...rest} />} />

        <Route path="/cart">
          <Cart />
        </Route>

        <Route path="/login">{auth ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
