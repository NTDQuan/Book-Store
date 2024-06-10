import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminLayout from "./Pages/AdminPanel/Layout/Layout";
import AdminBookContainer from "./Pages/AdminPanel/BookList/BookListPage";
import AdminAuthorContainer from "./Pages/AdminPanel/AuthorList/AuthorListPage";
import AdminCategoryContainer from "./Pages/AdminPanel/CategoryList/CategoryListPage";
import AdminHomeContainer from "./Pages/AdminPanel/Home/Home";
import StaffListPage from "./Pages/AdminPanel/StaffList/StaffListPage";
import CustomerListPage from "./Pages/AdminPanel/CustomerList/CustomerListPage";
import AdminLogin from "./Pages/AdminPanel/Auth/AdminLogin"; // Import AdminLogin
import PrivateRoute from "./components/Common/PrivateRoute"; // Import PrivateRoute
import OrderListPage from './Pages/AdminPanel/OrderList/OrderListPage';

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
          {
            path: "order", // Route for Order
            element: <OrderListPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;