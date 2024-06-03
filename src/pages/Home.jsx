import { useState } from "react";
import CheckboxLink from "../components/CheckboxLink";
import FormUserinput from "../components/FormUserInput";
import SpinnerButton from "../components/SpinnerButton";
import useAuthContext from "../context/AuthContext";
import { UserFields } from "../components/Common";

const Home = () => {
  const { user } = useAuthContext();
  const [loading, setLoadaing] = useState(false);
  const [values, setValues] = useState({
    id: user.id,
    imie: user.imie,
    nazwisko: user.nazwisko,
    email: user.email,
    password: user.password,
    password_confirmation: user.password,
    rokur: user.rokur,
    miasto: user.miasto,
    klub: user.klub,
  });
  const { user_update, errors } = useAuthContext();
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
      await user_update({ ...values });
      setLoadaing(false);
    } else setIsRegulaminError(true);
  };

  const onChange = (e) => {
    console.log({ ...values });
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
      <form onSubmit={handleRegister}>
        {inputs.map((input) => (
          <FormUserinput
            error={errors[input.name]}
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            disabled={loading}
            label={input.placeholder}
          />
        ))}

        <CheckboxLink
          description="Akceptuję"
          linkText="regulamin"
          linkAddress="https://www.sielata.com.pl/regulamin2023.pdf"
          errorText="Należy zaakceptować postanowienia regulaminu."
          isError={isRegulaminError}
          checked={isChecked}
          onChange={handleChecked}
        />
        <CheckboxLink
          name="opiekun"
          description="Rejestruję się jako instruktor, opiekun"
          errorText="Należy zaakceptować postanowienia regulaminu."
          checked={isChecked}
        />

        <div className="mb-10">
          <SpinnerButton disabled={loading} text="Zarejestruj" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Home;
