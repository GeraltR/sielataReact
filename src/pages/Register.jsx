import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import AuthLinkFood from "../components/AuthLinkFood";
import HomeLink from "../components/SimpleHomeLink";
import FormUserinput from "../components/FormUserInput";
import AuthDialogForm from "../components/AuthDialogForm";
import SpinnerButton from "../components/SpinnerButton";
import CheckboxLink from "../components/CheckboxLink";
import { UserFields, RegulaminURL } from "../components/Common";

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
  const [isChecked, setIsChecked] = useState(false);
  const [isRegulaminError, setIsRegulaminError] = useState(false);

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
    setIsRegulaminError(!event.target.checked);
  };

  const inputs = UserFields;

  const handleRegister = async (event) => {
    event.preventDefault();
    if (isChecked) {
      setLoadaing(true);
      await register({ ...values });
      setLoadaing(false);
    } else setIsRegulaminError(true);
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

        <CheckboxLink
          description="Akceptuję"
          linkText="regulamin"
          linkAddress={RegulaminURL}
          errorText="Należy zaakceptować postanowienia regulaminu."
          isError={isRegulaminError}
          checked={isChecked}
          onChange={handleChecked}
        />

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
