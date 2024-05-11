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
import CategoriesList from "./admin/categories/CategoriesList";
import CategroiesCreate from "./admin/categories/CategoriesCreate";
import CategroiesEdit from "./admin/categories/CategoriesEdit";
import CategoriesDelete from "./admin/categories/CategoriesDelete";
import Brand from "./admin/brand/Brand";
import BrandList from "./admin/brand/BrandList";
import BrandCreate from "./admin/brand/BrandCreate";
import BrandEdit from "./admin/brand/BrandEdit";
import BrandDelete from "./admin/brand/BrandDelete";
import Resupply from "./admin/resupply/Resupply";
import ResupplyList from "./admin/resupply/ResupplyList";
import ResupplyCreate from "./admin/resupply/ResupplyCreate";
import ResupplyEdit from "./admin/resupply/ResupplyEdit";
import ResupplyDelete from "./admin/resupply/ResupplyDelete";
import Users from "./admin/users/Users";
import UsersList from "./admin/users/UsersList";
import UsersEdit from "./admin/users/UsersEdit";
import UsersDelete from "./admin/users/UsersDelete";
import Transactions from "./admin/transactions/Transactions";
import TransactionsList from "./admin/transactions/TransactionsList";
import TransactionsCreate from "./admin/transactions/TransactionsCreate";
import TransactionsEdit from "./admin/transactions/TransactionsEdit";
import TransactionsDelete from "./admin/transactions/TransactionsDelete";
import Homepage from "./client/dashboard/Homepage";
import DetailPage from "./client/dashboard/DetailPage";
import Spk from "./admin/spk/Spk";
import SpkList from "./admin/spk/SpkList";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<DashboardClient />}>
            <Route index element={<Homepage />} />
            <Route path="detail/:spId" element={<DetailPage />} />
          </Route>
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
              <Route index element={<CategoriesList />} />
              <Route path="create-category" element={<CategroiesCreate />} />
              <Route path="edit-category/:cId" element={<CategroiesEdit />} />
              <Route path="delete-category/:cId" element={<CategoriesDelete />} />
            </Route>
            <Route path="brand" element={<Brand />}>
              <Route index element={<BrandList />} />
              <Route path="create-brand" element={<BrandCreate />} />
              <Route path="edit-brand/:bId" element={<BrandEdit />} />
              <Route path="delete-brand/:bId" element={<BrandDelete />} />
            </Route>
            <Route path="users" element={<Users />}>
              <Route index element={<UsersList />} />
              <Route path="edit-users/:uId" element={<UsersEdit />} />
              <Route path="delete-users/:uId" element={<UsersDelete />} />
            </Route>
            <Route path="resupply" element={<Resupply />}>
              <Route index element={<ResupplyList />} />
              <Route path="create-resupply" element={<ResupplyCreate />} />
              <Route path="edit-resupply/:rId" element={<ResupplyEdit />} />
              <Route path="delete-resupply/:rId" element={<ResupplyDelete />} />
            </Route>
            <Route path="transactions" element={<Transactions />}>
              <Route index element={<TransactionsList />} />
              <Route path="create-transaction" element={<TransactionsCreate />} />
              <Route path="edit-transaction/:tId" element={<TransactionsEdit />} />
              <Route path="delete-transaction/:tId" element={<TransactionsDelete />} />
            </Route>
            <Route path="spk" element={<Spk />}>
              <Route index element={<SpkList />} />
              <Route path="create-transaction" element={<TransactionsCreate />} />
              <Route path="edit-transaction/:tId" element={<TransactionsEdit />} />
              <Route path="delete-transaction/:tId" element={<TransactionsDelete />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
