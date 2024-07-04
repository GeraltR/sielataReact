import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import axios from "../api/axios";
import HomeLink from "../components/main/SimpleHomeLink";
import FormUserinput from "../components/toform/FormUserInput";
import AuthDialogForm from "../components/dialogs/AuthDialogForm";
import SpinnerButton from "../components/main/SpinnerButton";

const ResetPassword = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);

  const { csrf } = useAuthContext();

  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "hasło",
    },
    {
      id: 2,
      name: "password_confirmation",
      type: "password",
      placeholder: "Potwierdź hasło",
    },
  ];

  useEffect(() => {
    setValues({ ...values, ["email"]: searchParams.get("email") });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    await csrf();
    setStatus(null);
    try {
      const response = await axios.post("/reset-password", {
        ...values,
        token,
      });
      setStatus(response.data.status);
      setLoading(false);
    } catch (e) {
      if (e.response.status != 204) {
        setErrors(e.response.data.errors);
      }
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <AuthDialogForm>
      {status && (
        <div className="bg-green-700 m-2 p-2 rounded text-white">
          {status}
          <div className="m-2 p2">
            <Link to="/login">Zaloguj</Link>
          </div>
        </div>
      )}
      {!status && (
        <>
          <div className="mb-5 text-center text-2xl">
            Podaj swoje nowe hasło
          </div>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormUserinput
                error={errors[input.name]}
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
                disabled={loading}
              />
            ))}
            <div className="mb-10">
              <SpinnerButton
                disabled={loading}
                text="Zmień swoje hasło"
                type="submit"
              />
            </div>
          </form>
        </>
      )}
      <HomeLink />
    </AuthDialogForm>
  );
};

export default ResetPassword;
