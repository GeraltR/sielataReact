import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import AuthLinkFood from "../components/AuthLinkFood";
import HomeLink from "../components/SimpleHomeLink";
import FormUserinput from "../components/FormUserInput";
import AuthDialogForm from "../components/AuthDialogForm";
import SpinnerButton from "../components/SpinnerButton";

const Register = () => {
  const [loading, setLoadaing] = useState(false);
  const [values, setValues] = useState({
    imie: "",
    nazwisko: "",
    email: "",
    password: "",
    password_confirmation: "",
    rokur: "",
    miasto: "",
    klub: "",
  });
  const { register, errors } = useAuthContext();

  const inputs = [
    {
      id: 1,
      name: "imie",
      type: "text",
      placeholder: "Imię",
    },
    {
      id: 2,
      name: "nazwisko",
      type: "text",
      placeholder: "Nazwisko",
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "email",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Hasło",
    },
    {
      id: 5,
      name: "password_confirmation",
      type: "password",
      placeholder: "Potwierdź hasło",
    },
    {
      id: 6,
      name: "rokur",
      type: "text",
      placeholder: "Rok urodzenia",
    },
    {
      id: 7,
      name: "miasto",
      type: "text",
      placeholder: "Miasto",
    },
    {
      id: 8,
      name: "klub",
      type: "text",
      placeholder: "Klub",
    },
  ];

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoadaing(true);
    await register({ ...values });
    setLoadaing(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <AuthDialogForm>
      <form onSubmit={handleRegister}>
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
          <SpinnerButton disabled={loading} text="Zarejestruj" type="submit" />
        </div>
      </form>
      <AuthLinkFood disabled={!loading} isLogin={false} />
      <HomeLink />
    </AuthDialogForm>
  );
};

export default Register;
