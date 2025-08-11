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
    try {
      const { data } = await axios.get("/api/user");
      setUser(data);
      await getCategories();
      return data;      
    } catch (error) {
      
    }
  };

  const getCategories = async () => {
    // await csrf();
    const { data } = await axios.get(`/api/categories/${appParameters.year}`);
    if (data.status === 200) {
      setCategories({ categories: data.categories });
    }
  };

  const login = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post("/login", data);
      const currentUser = await getUser();
      if (currentUser.admin === 1) navigate("/listresults");
      else if (currentUser.admin === 2) navigate("/jury");
      else navigate("/");
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

  const short_user_update = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post("/api/shortupdate_user/" + data.id, data);
      navigate("/registeredmodels");
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
        short_user_update,
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
