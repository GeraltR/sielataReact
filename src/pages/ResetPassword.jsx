import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import axios from "../api/axios";
import HomeLink from "../components/SimpleHomeLink";
import FormUserinput from "../components/FormUserInput";

const ResetPassword = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [searchParams] = useSearchParams();
  const { token } = useParams();

  const { csrf } = useAuthContext();

  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "hasło",
    },
    {
      id: 2,
      name: "password_confirmation",
      type: "password",
      placeholder: "Potwierdź hasło",
    },
  ];

  useEffect(() => {
    //setEmail(searchParams.get("email"));
    setValues({ ...values, ["email"]: searchParams.get("email") });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();
    setErrors([]);
    setStatus(null);
    try {
      const response = await axios.post("/reset-password", {
        ...values,
        token,
      });
      setStatus(response.data.status);
    } catch (e) {
      if (e.response.status != 204) {
        if (e.response.status === 422) setErrors(e.response.data.errors);
      }
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
              {status && (
                <div className="bg-green-700 m-2 p-2 rounded text-white">
                  {status}
                  <div className="m-2 p2">
                    <Link to="/login">Zaloguj</Link>
                  </div>
                </div>
              )}
              {!status && (
                <>
                  <div className="mb-10 text-center md:mb-16">
                    Podaj swoje nowe hasło
                  </div>
                  <form onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                      <FormUserinput
                        error={errors[input.name]}
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                      />
                    ))}
                    <div className="mb-10">
                      <button
                        type="submit"
                        className="
                                    w-full
                                    px-4
                                    py-3
                                    bg-indigo-500
                                    hover:bg-indigo-700
                                    rounded-md
                                    text-white
                                "
                      >
                        Zmień swoje hasło
                      </button>
                    </div>
                  </form>
                </>
              )}
              <HomeLink />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
