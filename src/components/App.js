import Login from "./Login";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/variants" element={<Variants />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/add-variants" element={<AddVariant />} />
              <Route path="/product-preview" element={<ProductView />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
