import Login from "./Login";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Dashboard } from "./dashboard/Dashboard";
import { Products } from "./dashboard/Products/Products";
import { AddProduct } from "./dashboard/Products/AddProduct";
import { AddVariant } from "./dashboard/Products/AddVariant";
import { Variants } from "./dashboard/Products/Variants";
import { ProductView } from "./dashboard/Products/ProductPreview";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/products" component={Products} />
            <PrivateRoute exact path="/variants" component={Variants} />
            <PrivateRoute exact path="/add-product" component={AddProduct} />
            <PrivateRoute exact path="/add-variants" component={AddVariant} />
            <PrivateRoute
              exact
              path="/product-preview"
              component={ProductView}
            />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
