import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import AuthLinkFood from "../components/AuthLinkFood";
import HomeLink from "../components/SimpleHomeLink";
import FormUserinput from "../components/FormUserInput";

const Register = () => {
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

  const inputs = [
    {
      id: 1,
      name: "imie",
      type: "text",
      placeholder: "Imię",
    },
    {
      id: 2,
      name: "nazwisko",
      type: "text",
      placeholder: "Nazwisko",
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "email",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Hasło",
    },
    {
      id: 5,
      name: "password_confirmation",
      type: "password",
      placeholder: "Potwierdź hasło",
    },
    {
      id: 6,
      name: "rokur",
      type: "text",
      placeholder: "Rok urodzenia",
    },
    {
      id: 7,
      name: "miasto",
      type: "text",
      placeholder: "Miasto",
    },
    {
      id: 8,
      name: "klub",
      type: "text",
      placeholder: "Klub",
    },
  ];

  const handleRegister = async (event) => {
    event.preventDefault();
    register({ ...values });
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
              <form onSubmit={handleRegister}>
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
                    Zarejestruj
                  </button>
                </div>
              </form>
              <AuthLinkFood />
              <HomeLink />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
