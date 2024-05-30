import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import AuthLinkFood from "../components/AuthLinkFood";
import FormUserinput from "../components/FormUserInput";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

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
    login({ ...values });
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
              <div className="mb-10 text-center md:mb-16">SieLata</div>
              <form onSubmit={handleLogin}>
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
                    Zaloguj
                  </button>
                </div>
              </form>
              <AuthLinkFood />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
