import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./Pages/AdminPanel/Layout/Layout";
import AdminBookContainer from "./Pages/AdminPanel/BookList/BookListPage";
import AdminAuthorContainer from "./Pages/AdminPanel/AuthorList/AuthorListPage";
import AdminCategoryContainer from "./Pages/AdminPanel/CategoryList/CategoryListPage";
import AdminHomeContainer from "./Pages/AdminPanel/Home/Home";
import MainPage from './Pages/UserWeb/MainPage/MainPage'
import CustomerLayout from './Pages/UserWeb/Layout/CustomerLayout'
import StaffListPage from "./Pages/AdminPanel/StaffList/StaffListPage";
import CustomerListPage from "./Pages/AdminPanel/CustomerList/CustomerListPage";
import LoginPage from "./Pages/AdminPanel/Login/LoginPage";
import CustomerLoginPage from './Pages/UserWeb/CustomerLogin/CustomerLoginPage'
import { PrivateAdminRoute, PrivateCustomerRoute } from "./route/PrivateRoute";
import AuthProvider from "./hooks/AuthProvider";
import Register from "./Pages/UserWeb/CustomerRegistration/CustomerRegistration";
import CustomerBookListPage from "./Pages/UserWeb/BookList/CustomerBookListPage";
import CreateOrderPage from "./Pages/UserWeb/CreateOrder/CreateOrderPage";
import ProductContextProvider from "./hooks/ProductContext";
import ProductDetailPage from "./Pages/UserWeb/Product_Detail/Product_Detail"
import CartPage from "./Pages/UserWeb/Cart/Cart";
import CustomerOrderList from "./Pages/UserWeb/OrderList/OrderList";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ProductContextProvider>
            <Routes>
              <Route path="/admin/login" element={<LoginPage />} />
              <Route element={<PrivateAdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="books" element={<AdminBookContainer />} />
                  <Route path="authors" element={<AdminAuthorContainer />} />
                  <Route path="categories" element={<AdminCategoryContainer />} />
                  <Route path="home" element={<AdminHomeContainer />} />
                  <Route path="staffs" element={<StaffListPage />} />
                  <Route path="customers" element={<CustomerListPage />} />
                </Route>
              </Route>
              <Route path="/login" element={<CustomerLoginPage />}/>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<CustomerLayout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/books" element={<CustomerBookListPage />}/>
                <Route path="/books/:bookID" element={<ProductDetailPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/create-order" element={<CreateOrderPage />} />
                <Route path="/your-order" element={<CustomerOrderList />} />
              </Route>
            </Routes>
          </ProductContextProvider>

        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;