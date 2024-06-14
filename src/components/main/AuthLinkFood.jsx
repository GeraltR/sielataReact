import { Link } from "react-router-dom";

const AuthLinkFood = ({ ...props }) => {
  return (
    <section>
      {props.disabled && (
        <>
          <Link
            to="/forgot-password"
            className="mb-2 inline-block text-base text-[#adadad] hover:text-primary hover:underline"
          >
            Nie pamiętam hasła...
          </Link>
          <p className="text-base text-[#adadad]"></p>
          <Link
            to={props.isLogin ? `/register` : `/login`}
            className="text-primary hover:underline"
          >
            {props.isLogin ? `Chcę się zarejestrować.` : `Zaloguj`}
          </Link>
        </>
      )}
    </section>
  );
};

export default AuthLinkFood;
