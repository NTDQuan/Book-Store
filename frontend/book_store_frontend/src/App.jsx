import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminLayout from "./Pages/AdminPanel/Layout/Layout"
import AdminBookContainer from "./Pages/AdminPanel/BookList/BookListPage"
import AdminAuthorContainer from "./Pages/AdminPanel/AuthorList/AuthorListPage"
import AdminHomeContainer from "./Pages/AdminPanel/Home/Home"
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
      }
    ],
  }
]);


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
