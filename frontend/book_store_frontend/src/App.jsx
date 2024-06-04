import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminLayout from "./Pages/AdminPanel/Layout/Layout"
import AdminBookContainer from "./Pages/AdminPanel/BookList/BookListPage"
import AdminAuthorContainer from "./Pages/AdminPanel/AuthorList/AuthorListPage"
import AdminCategoryContainer from "./Pages/AdminPanel/CategoryList/CategoryListPage"
import AdminHomeContainer from "./Pages/AdminPanel/Home/Home"
import StaffListPage  from "./Pages/AdminPanel/StaffList/StaffListPage";
import CustomerListPage  from "./Pages/AdminPanel/CustomerList/CustomerListPage";
import "./Styles/global.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>user interface</div>
    ),
  },
  {
    path: "/admin",
    element: <AdminLayout/>,
    children: [
      {
        path: "books",
        element: <AdminBookContainer/>
      },
      {
        path: "",
        element: <AdminHomeContainer/>
      },
      {
        path: "authors",
        element: <AdminAuthorContainer/>
      },
      {
        path: "categories",
        element: <AdminCategoryContainer/>
      },
      {
        path: "staff", // Route for Staff
        element: <StaffListPage/>
      },
      {
        path: "customer", // Route for customer
        element: <CustomerListPage/>
      },
    ],
  }
]);


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
