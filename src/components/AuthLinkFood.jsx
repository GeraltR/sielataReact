import { Link } from "react-router-dom";

const AuthLinkFood = () => {
  return (
    <section>
      <Link
        to="/forgot-password"
        className="mb-2 inline-block text-base text-[#adadad] hover:text-primary hover:underline"
      >
        Nie pamiętam hasła...
      </Link>
      <p className="text-base text-[#adadad]"></p>
      <Link to="/register" className="text-primary hover:underline">
        Chcę się zarejestrować.
      </Link>
    </section>
  );
};

export default AuthLinkFood;
