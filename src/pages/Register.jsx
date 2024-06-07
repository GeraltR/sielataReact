import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import AuthLinkFood from "../components/AuthLinkFood";
import HomeLink from "../components/SimpleHomeLink";
import FormUserinput from "../components/FormUserInput";
import AuthDialogForm from "../components/AuthDialogForm";
import SpinnerButton from "../components/SpinnerButton";
import CheckboxLink from "../components/CheckboxLink";
import { UserFields, RegulaminURL } from "../components/Common";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [reCaptchaToken, setReCaptchaToken] = useState("");
  const handleRecaptcha = (value) => {
    setReCaptchaToken(value);
  };

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

        <div className="mb-10 mx-auto items-center text-center">
          <ReCAPTCHA
            className="g-captcha"
            sitekey={import.meta.env.VITE_APP_SITE_KEY}
            onChange={handleRecaptcha}
          />
          {!reCaptchaToken && (
            <label className="mt-px font-light text-red-700">
              <div>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-red-700">
                  Musisz to potwierdzić
                </p>
              </div>
            </label>
          )}
        </div>

        <div className="mb-10">
          <SpinnerButton
            visibility={!reCaptchaToken}
            disabled={loading}
            text="Zarejestruj"
            type="submit"
          />
        </div>
      </form>
      <AuthLinkFood disabled={!loading} isLogin={false} />
      <HomeLink />
    </AuthDialogForm>
  );
};

export default Register;
