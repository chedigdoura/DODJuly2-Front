import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import AddEditProduct from "./pages/AddEditProduct";
import SingleProduct from "./pages/SingleProduct";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  });
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addProduct"
            element={
              <PrivateRoute>
                {" "}
                <AddEditProduct />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/editProduct/:id"
            element={
              <PrivateRoute>
                {" "}
                <AddEditProduct />{" "}
              </PrivateRoute>
            }
          />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />{" "}
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
