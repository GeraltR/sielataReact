import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { appParameters } from "../components/main/Common";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState({ categories: [] });
  const navigate = useNavigate();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await axios.get("/api/user");
    setUser(data);
    await getCategories();
  };

  const getCategories = async () => {
    // await csrf();
    const { data } = await axios.get(`/api/categories/${appParameters.year}`);
    console.log(data.categories);
    if (data.status === 200) {
      setCategories({ categories: data.categories });
      console.log(categories);
    }
  };

  const login = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post("/login", data);
      await getUser();
      navigate("/");
    } catch (e) {
      if (e.response.status != 204) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const register = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post("/register", data);
      await getUser();
      navigate("/");
    } catch (e) {
      if (e.response.status != 204) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const user_update = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post("/api/update_user/" + data.id, data);
      await getUser();
      navigate("/");
    } catch (e) {
      if (e.response.status != 204) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const change_teacher = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post("/api/change_teacher/" + data.id, data);
      await getUser();
      navigate("/");
    } catch (e) {
      if (e.response.status != 204) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const logout = () => {
    axios.post("/logout").then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        getUser,
        login,
        register,
        logout,
        csrf,
        user_update,
        change_teacher,
        categories,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
