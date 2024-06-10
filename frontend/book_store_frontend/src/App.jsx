import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./Pages/AdminPanel/Layout/Layout";
import AdminBookContainer from "./Pages/AdminPanel/BookList/BookListPage";
import AdminAuthorContainer from "./Pages/AdminPanel/AuthorList/AuthorListPage";
import AdminCategoryContainer from "./Pages/AdminPanel/CategoryList/CategoryListPage";
import AdminHomeContainer from "./Pages/AdminPanel/Home/Home";
import StaffListPage from "./Pages/AdminPanel/StaffList/StaffListPage";
import CustomerListPage from "./Pages/AdminPanel/CustomerList/CustomerListPage";
import LoginPage from "./Pages/AdminPanel/Login/LoginPage";
import CustomerLoginPage from './Pages/UserWeb/CustomerLogin/CustomerLoginPage'
import PrivateAdminRoute from "./route/PrivateRoute";
import AuthProvider from "./hooks/AuthProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
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
            </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;