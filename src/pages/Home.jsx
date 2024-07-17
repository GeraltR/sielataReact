import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuthContext from "../context/AuthContext";
import ModelarLayout from "../layouts/ModelarLayout";
import CheckboxLink from "../components/main/CheckboxLink";
import FormUserinput from "../components/toform/FormUserInput";
import SpinnerButton from "../components/main/SpinnerButton";
import ModalSpinner from "../components/main/ModalSpinner";
import {
  appParameters,
  IsRegisterTermAvailable,
  RegulaminURL,
  UserFields,
} from "../components/main/Common";

const Home = () => {
  const { change_teacher, user_update, errors, user } = useAuthContext();
  const [loading, setLoading] = useState(false);
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

  const [isRegulaminChecked, setIsRegulaminChecked] = useState(false);
  const [isRegulaminError, setIsRegulaminError] = useState(false);
  const [showLearner, setShowLearner] = useState(false);

  const [categories, setCategories] = useState({
    categories: [],
    loading: true,
  });

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getCategories = async () => {
    await csrf();
    const { data } = await axios.get(`/api/categories/${appParameters.year}`);
    if (data.status === 200)
      setCategories({ categories: data.categories, loading: false });
    setLoading(false);
  };

  const handleRegulaminChecked = (event) => {
    setIsRegulaminChecked(event.target.checked);
    setIsRegulaminError(!event.target.checked);
  };

  const handleIsTeacherChecked = (e) => {
    if (!IsRegisterTermAvailable()) return null;
    values.isteacher = e.target.checked;
    setValues({ ...values, [e.target.name]: e.target.value });
    change_teacher({ ...values });
    setShowLearner(values.isteacher);
  };

  const inputs = JSON.parse(JSON.stringify(UserFields));

  const handleRegister = async (event) => {
    if (!IsRegisterTermAvailable()) return null;
    event.preventDefault();
    if (isRegulaminChecked) {
      setLoading(true);
      await user_update({ ...values }).then(setShowLearner(values.isteacher));
    } else setIsRegulaminError(true);
    setLoading(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setShowLearner(values.isteacher);
  };

  useEffect(() => {
    setShowLearner(values.isteacher);
    getCategories();
  }, []);

  return (
    <>
      <ModalSpinner visibled={loading} />
      <main className="relativ grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 col-span-1 px-3 md:grid-flow-col gap-4 md:gap-0">
        <div className="static m-3 p-3 rounded-md bg-white shadow-md shadow-gray-200 bg-opacity-30">
          <div>
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
              <div className="inline-flex mb-4">
                <CheckboxLink
                  name="checkregulamin"
                  description="Akceptuję"
                  linkText="regulamin"
                  linkAddress={RegulaminURL}
                  errorText="Należy zaakceptować postanowienia regulaminu."
                  isError={isRegulaminError}
                  checked={isRegulaminChecked}
                  value={isRegulaminChecked}
                  onChange={handleRegulaminChecked}
                  disabled={loading}
                />
              </div>
              <div className="inline-flex mb-4">
                <CheckboxLink
                  name="checkopiekun"
                  description="Rejestruję się jako instruktor, opiekun"
                  errorText="Należy zaakceptować postanowienia regulaminu."
                  checked={values["isteacher"]}
                  value={values["isteacher"]}
                  onChange={handleIsTeacherChecked}
                  disabled={loading}
                />
              </div>

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
        </div>
        <ModelarLayout
          userdata={values}
          showLearner={showLearner}
          categories={categories}
        />
      </main>
    </>
  );
};

export default Home;
