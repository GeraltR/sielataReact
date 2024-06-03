import useAuthContext from "../context/AuthContext";

const RegisterModels = () => {
  const { user } = useAuthContext();

  return (
    <div className="md-4">
      <h1 className="text-lg">
        {" "}
        Rejestracja modeli dla: {user.imie} {user.nazwisko}
      </h1>
    </div>
  );
};

export default RegisterModels;
