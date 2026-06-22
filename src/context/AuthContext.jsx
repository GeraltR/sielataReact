import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState({ categories: [] });
  const [festival, setFestival] = useState(null);
  const festivalRef = useRef(null);
  const navigate = useNavigate();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getFestival = async () => {
    try {
      const { data } = await axios.get("/api/festival/current");
      festivalRef.current = data;
      setFestival(data);
      return data;
    } catch (error) {
      // festival stays null
    }
  };

  const getCategories = async () => {
    const year = festivalRef.current?.year ?? new Date().getFullYear();
    const { data } = await axios.get(`/api/categories/${year}`);
    if (data.status === 200) {
      setCategories({ categories: data.categories });
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user");
      setUser(data);
      await getCategories();
      return data;
    } catch (error) {

    }
  };

  const login = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post("/login", data);
      const currentUser = await getUser();
      if (currentUser.admin & 4) navigate("/listresults");
      else if (currentUser.admin & 1) navigate("/jury");
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

  const emptyCartonClass = categories.categories.find(c => c.symbol === "0000")?.idkat ?? 1;
  const emptyPlasticClass = categories.categories.find(c => c.symbol === "000")?.idkat ?? 26;

  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 419) {
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    const init = async () => {
      await getFestival();
      await getUser();
      setInitializing(false);
    };
    init();

    return () => axios.interceptors.response.eject(interceptorId);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
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
        festival,
        emptyCartonClass,
        emptyPlasticClass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
