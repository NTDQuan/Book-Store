import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem("customer")) || null);
    const navigate = useNavigate();
    const loginAction = async (data) => {
        console.log(data)
        try {
            const response = await fetch ("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const res = await response.json();
            if (res.token) {
                const userData = {
                    id: res.id,
                    token: res.token,
                    role: res.role[0]
                  };
                setUser(userData);
                console.log(user)
                localStorage.setItem("user", JSON.stringify(userData));
                navigate("/admin");
                return;
            }
            throw new Error(res.message);
        } catch (error) {
            console.log(error);
        }
    };

    const loginCustomerAction = async (data) => {
        console.log(data)
        try {
            const response = await fetch ("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const res = await response.json();
            if (res.token) {
                const customerData = {
                    id: res.id,
                    token: res.token,
                    role: res.role[0]
                  };
                setCustomer(customerData);
                console.log(customer)
                localStorage.setItem("user", JSON.stringify(customerData));
                navigate("/");
                return;
            }
            throw new Error(res.message);
        } catch (error) {
            console.log(error);
        }
    }

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'))
    }

    const logOut = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("admin/login");
      };

    return (
        <AuthContext.Provider value={{ user, loginAction, loginCustomerAction, logOut, getCurrentUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}