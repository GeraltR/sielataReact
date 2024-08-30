import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuthContext from "../context/AuthContext";
import { IsRegisterTermAvailable, UserFields } from "../components/main/Common";
import UserRegister from "../components/toform/UserRegister";

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
    admin: user.admin,
  });

  const [isRegulaminChecked, setIsRegulaminChecked] = useState(false);
  const [isRegulaminError, setIsRegulaminError] = useState(false);
  const [showLearner, setShowLearner] = useState(false);

  const { categories } = useAuthContext();

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
  }, []);

  return (
    <>
      <UserRegister
        handleRegister={handleRegister}
        loading={loading}
        inputs={inputs}
        errors={errors}
        values={values}
        onChange={onChange}
        isRegulaminError={isRegulaminError}
        isRegulaminChecked={isRegulaminChecked}
        handleRegulaminChecked={handleRegulaminChecked}
        handleIsTeacherChecked={handleIsTeacherChecked}
        showLearner={showLearner}
        categories={categories}
      />
    </>
  );
};

export default Home;
