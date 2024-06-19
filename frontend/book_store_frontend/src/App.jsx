<<<<<<< HEAD
import { RouterProvider, createBrowserRouter } from "react-router-dom";
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> a361e26078890e2da368369e4ae9618d02da7ab5
import AdminLayout from "./Pages/AdminPanel/Layout/Layout";
import AdminBookContainer from "./Pages/AdminPanel/BookList/BookListPage";
import AdminAuthorContainer from "./Pages/AdminPanel/AuthorList/AuthorListPage";
import AdminCategoryContainer from "./Pages/AdminPanel/CategoryList/CategoryListPage";
import AdminHomeContainer from "./Pages/AdminPanel/Home/Home";
<<<<<<< HEAD
import StaffListPage from "./Pages/AdminPanel/StaffList/StaffListPage";
import CustomerListPage from "./Pages/AdminPanel/CustomerList/CustomerListPage";
import AdminLogin from "./Pages/AdminPanel/Auth/AdminLogin"; // Import AdminLogin
import PrivateRoute from "./components/Common/PrivateRoute"; // Import PrivateRoute
import "./Styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>user interface</div>
    ),
  },
  {
    path: "/admin/login",
    element: <AdminLogin />, // Route cho trang đăng nhập admin
  },
  {
    path: "/admin",
    element: <PrivateRoute />, // Bảo vệ tất cả các route dưới /admin
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            path: "books",
            element: <AdminBookContainer />,
          },
          {
            path: "",
            element: <AdminHomeContainer />,
          },
          {
            path: "authors",
            element: <AdminAuthorContainer />,
          },
          {
            path: "categories",
            element: <AdminCategoryContainer />,
          },
          {
            path: "staff", // Route for Staff
            element: <StaffListPage />,
          },
          {
            path: "customer", // Route for Customer
            element: <CustomerListPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
=======
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
import ProductContextProvider from "./hooks/ProductContext";
import ProductDetailPage from "./Pages/UserWeb/Product_Detail/Product_Detail"

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
              </Route>
            </Routes>
          </ProductContextProvider>

        </AuthProvider>
      </Router>
    </div>
>>>>>>> a361e26078890e2da368369e4ae9618d02da7ab5
  );
}

export default App;