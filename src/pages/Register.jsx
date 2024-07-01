import { useEffect, useRef, useState } from "react";
import useAuthContext from "../context/AuthContext";
import AuthLinkFood from "../components/main/AuthLinkFood";
import HomeLink from "../components/main/SimpleHomeLink";
import FormUserinput from "../components/toform/FormUserInput";
import AuthDialogForm from "../components/dialogs/AuthDialogForm";
import SpinnerButton from "../components/main/SpinnerButton";
import CheckboxLink from "../components/main/CheckboxLink";
import { UserFields, RegulaminURL } from "../components/main/Common";
import ReCAPTCHA from "react-google-recaptcha";
import ModalSpinner from "../components/main/ModalSpinner";

const Register = () => {
  const [loading, setLoading] = useState(false);
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
  const [token, setToken] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const captchaRef = useRef(null);

  useEffect(() => {
    if (token.length) {
      setSubmitEnabled(true);
      values.recaptchatoken = token;
    }
  }, [token, values]);

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
    setIsRegulaminError(!event.target.checked);
  };

  const inputs = UserFields;

  const handleRegister = async (event) => {
    event.preventDefault();
    if (isChecked) {
      captchaRef.current.reset();
      setLoading(true);
      await register({ ...values });
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ModalSpinner visibled={loading} />
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
            name="checkRegulamin"
            description="Akceptuję"
            linkText="regulamin"
            linkAddress={RegulaminURL}
            errorText="Należy zaakceptować postanowienia regulaminu."
            isError={isRegulaminError}
            checked={isChecked}
            onChange={handleChecked}
          />

          <div className="mb-10 mx-auto items-center text-center">
            {!loading && (
              <ReCAPTCHA
                className="g-captcha"
                sitekey={import.meta.env.VITE_APP_SITE_KEY}
                ref={captchaRef}
                onChange={setToken}
              />
            )}
          </div>
          {submitEnabled && (
            <div className="mb-10">
              <SpinnerButton
                disabled={loading}
                text="Zarejestruj"
                type="submit"
              />
            </div>
          )}
        </form>
        <AuthLinkFood disabled={!loading} isLogin={false} />
        <HomeLink />
      </AuthDialogForm>
    </>
  );
};

export default Register;
