import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import axios from "../api/axios";
import HomeLink from "../components/SimpleHomeLink";
import FormUserinput from "../components/FormUserInput";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
  });
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Wprowadź zarejestrowany adres email",
    },
  ];

  const { csrf } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();
    setErrors([]);
    setStatus(null);
    try {
      const response = await axios.post("/forgot-password", { ...values });
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
                </div>
              )}
              <div className="mb-10 text-center md:mb-16">
                Zapomniałeś swojego hasła? Wyślij do nas swój adres email, a
                wyślemy Ci link do utworzenia nowego hasła.
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
                    Wyślij email
                  </button>
                  <HomeLink />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
