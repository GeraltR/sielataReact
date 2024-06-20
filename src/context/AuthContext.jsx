import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await axios.get("/api/user");
    setUser(data);
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

  const add_pupil = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post("/api/add_pupil/" + data.idopiekuna, data);
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
      setPupil(null);
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
        add_pupil,
        change_teacher,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
