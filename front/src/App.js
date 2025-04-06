import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import EditUser from "./pages/EditUser";
import UserSearch from "./pages/UserSearch";
import NotFound from "./pages/NotFound";
import ProductSearch from "./pages/SearchProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public inside layout */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected inside layout */}
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="change_password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />  

          <Route
            path="edit-user/:id"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="search_users"
            element={
              <ProtectedRoute>
                <UserSearch />
              </ProtectedRoute>
            }
          />

          <Route
            path="products"
            element={
              <ProtectedRoute>
                <ProductSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="add_product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="edit-product/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
       
          <Route
            path="about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          {/* Catch-all inside layout */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
      
                                      
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
