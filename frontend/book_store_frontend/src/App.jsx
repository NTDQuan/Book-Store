import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminLayout from "./Pages/AdminPanel/Layout/Layout"
import AdminBookContainer from "./Pages/AdminPanel/Book/Book"
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
        path: "book",
        element: <AdminBookContainer/>
      },
      {
        path: "",
        element: <AdminHomeContainer/>
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
