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
import { Orders } from "./dashboard/Orders/Orders";
import { SingleOrder } from "./dashboard/Orders/SingleOrder";
import { AddCoupon } from "./dashboard/Coupons/AddCoupon";
import { ViewCoupons } from "./dashboard/Coupons/ViewCoupons";
import { ViewColors } from "./dashboard/Master/Color/ViewColors";
import { AddColor } from "./dashboard/Master/Color/AddColor";
import { ViewDesignTypes } from "./dashboard/Master/DesignType/ViewDesignTypes";
import { AddDesignType } from "./dashboard/Master/DesignType/AddDesignType";

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
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderHandle" element={<SingleOrder />} />
              <Route path="/add-products" element={<AddProduct />} />
              <Route path="/add-variants" element={<AddVariant />} />
              <Route path="/product-preview" element={<ProductView />} />
              <Route path="/coupons" element={<ViewCoupons />} />
              <Route path="/add-coupons" element={<AddCoupon />} />
              <Route path="/color/view-colors" element={<ViewColors />} />
              <Route path="/color/add-color" element={<AddColor />} />
              <Route
                path="/design-type/view-design-types"
                element={<ViewDesignTypes />}
              />
              <Route
                path="/design-type/add-design-type"
                element={<AddDesignType />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
