import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuthContext from "../context/AuthContext";
import ModalSpinner from "../components/main/ModalSpinner";
import SpinnerButton from "../components/main/SpinnerButton";
import { PersonFields } from "../components/main/Common";
import FormUserinput from "../components/toform/FormUserInput";
import ResultSearchUsersList from "./special/ResultSearchUsersList";

const RegisterModels = () => {
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [userToChange, setUserToChange] = useState({
    id: 0,
    imie: "",
    nazwisko: "",
    email: "",
    rokur: 0,
    miasto: "",
    klub: "",
    isteacher: 0,
    admin: 0,
  });
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [lastKeyTyping, setLastKeyTyping] = useState("");
  const [memberKeyTyping, setMemberKeyTyping] = useState("");
  const [listUsers, setListUsers] = useState([]);

  const { short_user_update, errors } = useAuthContext();

  const inputs = JSON.parse(JSON.stringify(PersonFields));

  const getListUsers = async (find) => {
    try {
      const { data } = await axios.get(`api/finduser/${find}`);
      setSelectedUser("");
      setListUsers(data.users);
    } catch (error) {
      //console.log(data.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (lastKeyTyping === memberKeyTyping) {
      getListUsers(lastKeyTyping);
      setLastKeyTyping("");
    }
  }, [lastKeyTyping, memberKeyTyping]);

  const handleOnChange = (e) => {
    console.log(e.target.value);

    setSelectedUser(e.target.value);
    setLastKeyTyping(e.target.value);
  };

  const handleCheckUser = (user) => {
    setSelectedUser(`${user.imie} ${user.nazwisko}`);
    setUserToChange(user);
    setListUsers(null);
    setLastKeyTyping("");
    setMemberKeyTyping("");
  };

  const onChangeInputUser = (e) => {
    setUserToChange({ ...userToChange, [e.target.name]: e.target.value });
  };

  const onChangePermision = (e) => {
    setUserToChange({ ...userToChange, ["admin"]: e.target.value });
  };

  const handleSaveUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    await short_user_update({ ...userToChange });
    setLoading(false);
  };

  return (
    <>
      <ModalSpinner visibled={loading} key="modalSpinnerFindUsers" />
      <section className="block xl:grid xl:col-span-2 md:grid md:col-span-1 gap-8 p-1 h-max">
        <div className="relative w-[100%] md:w-[60%] xl:w-[40%]">
          <div className="xl:flex md:grid w-full mx-auto xl:w-full md:w-full bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-500 mb-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="szukaj wg numeru lub nazwy"
              value={selectedUser}
              onChange={(e) => handleOnChange(e)}
              onKeyDown={(e) => {
                setIsSearchActive(true);
                setTimeout(() => setMemberKeyTyping(e.target.value), 1500);
              }}
            />
          </div>
          {isSearchActive && Object(listUsers).length > 0 && (
            <ResultSearchUsersList
              listUsers={listUsers}
              handleCheckUser={handleCheckUser}
            />
          )}
          <div className="mx-2 md-4">
            <h1 className="text-lg">
              Rejestracja modeli dla:
              {isSearchActive && userToChange != null
                ? ` ${userToChange.imie} ${userToChange.nazwisko}`
                : ""}
            </h1>
          </div>
        </div>
        <main className="relativ grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 col-span-1 px-3 md:grid-flow-col gap-4 md:gap-0">
          <div className="static m-3 p-3 rounded-md bg-white shadow-md shadow-gray-200 bg-opacity-30">
            <div>
              <form onSubmit={handleSaveUser}>
                {inputs.map((input) => (
                  <FormUserinput
                    error={errors[input.name]}
                    key={input.id}
                    {...input}
                    value={`${
                      userToChange != null
                        ? userToChange[input.name] != null
                          ? userToChange[input.name]
                          : ""
                        : ""
                    }`}
                    onChange={onChangeInputUser}
                    disabled={loading}
                    label={input.placeholder}
                  />
                ))}
                <select
                  className="bg-gray-50 mb-4 py-3 p-5 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={`${userToChange != null ? userToChange.admin : 0}`}
                  onChange={onChangePermision}
                >
                  <option value="0">Zawodnik</option>
                  <option value="2">Sędzia</option>
                  <option value="1">Administrator</option>
                </select>
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
        </main>
      </section>
    </>
  );
};

export default RegisterModels;
