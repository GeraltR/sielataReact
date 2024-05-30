import useAuthContext from "../context/AuthContext";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className="max-w-7xl mx-auto mt-12">
      {" "}
      {user?.imie} {user?.nazwisko}{" "}
    </div>
  );
};

export default Home;
