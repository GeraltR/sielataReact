import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import AuthLinkFood from "../components/AuthLinkFood";
import FormUserinput from "../components/FormUserInput";
import SpinnerButton from "../components/SpinnerButton";
import AuthDialogForm from "../components/AuthDialogForm";
import ModalSpinner from "../components/ModalSpinner";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoadaing] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Hasło",
    },
  ];

  const { login, errors } = useAuthContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoadaing(true);
    await login({ ...values });
    setLoadaing(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ModalSpinner visibled={loading} left="46%" top="30%" />
      <AuthDialogForm>
        <form onSubmit={handleLogin}>
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
            <SpinnerButton disabled={loading} text="Zaloguj" type="submit" />
          </div>
        </form>
        <AuthLinkFood disabled={!loading} isLogin={true} />
      </AuthDialogForm>
    </>
  );
};

export default Login;
