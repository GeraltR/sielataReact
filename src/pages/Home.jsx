import { useState } from "react";
import CheckboxLink from "../components/CheckboxLink";
import FormUserinput from "../components/FormUserInput";
import SpinnerButton from "../components/SpinnerButton";
import useAuthContext from "../context/AuthContext";
import { RegulaminURL, UserFields } from "../components/Common";
import ModelarLayout from "../layouts/ModelarLayout";

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
    isteacher: user.isteacher,
  });
  const { user_update, errors } = useAuthContext();
  const [isRegulaminChecked, setIsRegulaminChecked] = useState(false);
  const [isRegulaminError, setIsRegulaminError] = useState(false);

  const handleRegulaminChecked = (event) => {
    setIsRegulaminChecked(event.target.checked);
    setIsRegulaminError(!event.target.checked);
  };

  const handleIsTeacherChecked = (e) => {
    values.isteacher = e.target.checked;
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log({ ...values });
  };

  const inputs = UserFields;

  const handleRegister = async (event) => {
    event.preventDefault();
    if (isRegulaminChecked) {
      setLoadaing(true);
      await user_update({ ...values });
      setLoadaing(false);
    } else setIsRegulaminError(true);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 col-span-1 px-3 md:grid-flow-col gap-4 bg-orange-200">
      <div className="row-span3 m-3 p-3 rounded-md bg-white">
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
            linkAddress={RegulaminURL}
            errorText="Należy zaakceptować postanowienia regulaminu."
            isError={isRegulaminError}
            checked={isRegulaminChecked}
            onChange={handleRegulaminChecked}
          />
          <CheckboxLink
            name="opiekun"
            description="Rejestruję się jako instruktor, opiekun"
            errorText="Należy zaakceptować postanowienia regulaminu."
            checked={values["isteacher"]}
            value={values["isteacher"]}
            onChange={handleIsTeacherChecked}
          />

          <div className="mb-10">
            <SpinnerButton
              disabled={loading}
              text="Zapisz"
              type="submit"
              id="saveDataUserButton"
            />
          </div>
        </form>
      </div>
      <ModelarLayout userName={values["imie"] + " " + values["nazwisko"]} />
    </main>
  );
};

export default Home;
