import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import axios from "../api/axios";
import HomeLink from "../components/main/SimpleHomeLink";
import FormUserinput from "../components/toform/FormUserInput";
import AuthDialogForm from "../components/dialogs/AuthDialogForm";
import SpinnerButton from "../components/main/SpinnerButton";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
  });
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Wprowadź zarejestrowany adres email",
    },
  ];

  const { csrf } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();
    setErrors([]);
    setStatus(null);
    try {
      setLoading(true);
      const response = await axios.post("/forgot-password", { ...values });
      setStatus(response.data.status);
      setLoading(false);
    } catch (e) {
      if (e.response.status != 204) {
        if (e.response.status === 422) setErrors(e.response.data.errors);
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
        <div className="bg-green-700 m-2 p-2 rounded text-white">{status}</div>
      )}
      <div className="mb-10 text-center md:mb-16">
        Zapomniałeś swojego hasła? Wyślij do nas swój adres email, a wyślemy Ci
        link do utworzenia nowego hasła.
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
          <SpinnerButton disabled={loading} text="Wyślij email" type="submit" />
        </div>
        <HomeLink />
      </form>
    </AuthDialogForm>
  );
};

export default ForgotPassword;
