import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import NavBar from "./admin/navigation/NavBar";
import SideBar from "./admin/navigation/SideBar";
import Products from "./admin/products/Products";
import ProductsList from "./admin/products/ProductsList";
import ProductsCreate from "./admin/products/ProductsCreate";
import ProductsEdit from "./admin/products/ProductsEdit";
import ProductsDelete from "./admin/products/ProductsDelete";
import DashboardClient from "./client/dashboard/DashboardClient";
import DashboardAdmin from "./admin/dashboard/DashboardAdmin";
import Categories from "./admin/categories/Categories";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<DashboardClient />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<DashboardAdmin />}>
            <Route path="products" element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path="create-product" element={<ProductsCreate />} />
              <Route path="edit-product/:pId" element={<ProductsEdit />} />
              <Route path="delete-product/:pId" element={<ProductsDelete />} />
            </Route>
            <Route path="categories" element={<Categories />}>
              <Route index element={<ProductsList />} />
              <Route path="create-category" element={<ProductsCreate />} />
              <Route path="edit-category/:cId" element={<ProductsEdit />} />
              <Route path="delete-category/:cId" element={<ProductsDelete />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
