import { Link, Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useState } from "react";

const AuthLayout = () => {
  const { user, logout } = useAuthContext();
  const [toggle, setToggle] = useState(false);

  const showNav = () => {
    setToggle(!toggle);
  };

  return user ? (
    <>
      <nav className="top-0 w-full bg-indigo-900 text-white px-2 py-2.5 sm:px-4 flex items-center p-4">
        <div className="flex w-full flex-wrap items-center justify-between md:flex-nowrap">
          <h1 className="text-xl text-white font-bold cursor-pointer">
            SieLata
          </h1>
          <button
            data-collapse-toggle="navbar-hamburger"
            type="button"
            className="inline-flex items-center md:hidden justify-center p-2 w-10 h-10 text-sm text-white-500 rounded-lg hover:bg-gray-100 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-hamburger"
            aria-expanded="false"
            onClick={showNav}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <ul
            className={`${
              toggle ? " flex" : " hidden"
            } flex-col justify-center items-center w-full first:mt-2 md:flex-row md:w-auto md:space-x-10 md:flex`}
          >
            <li>
              <Link
                to="/"
                className="block rounded py-2 pr-4 pl-3 text-white hover:text-yellow-500"
                aria-current="page"
                onClick={showNav}
              >
                Strona główna
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={showNav}
                    className="block rounded py-2 pr-4 pl-3 text-white hover:text-yellow-500"
                  >
                    Moje dane
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={showNav}
                    className="block rounded py-2 pr-4 pl-3 text-white hover:text-yellow-500"
                  >
                    Moje modele
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={logout}
                    className="block rounded py-2 pr-4 pl-3 text-white hover:text-yellow-500"
                  >
                    Wyloguj
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block rounded py-2 pr-4 pl-3 text-white hover:text-yellow-500"
                    aria-current="page"
                  >
                    Zaloguj
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block rounded py-2 pr-4 pl-3 text-white"
                    aria-current="page"
                  >
                    Rejestracja
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  ) : (
    <button
      className={`${
        toggle ? " flex" : " hidden"
      } text-white-800 hover:bg-gray-300 mx-auto md:mx-0 md:flex md:mt-0 items-center justify-center font-medium bg-gray-100 px-1 p-2 rounded-lg mt-4 w-24`}
    >
      <Navigate to="/login" />
    </button>
  );
};

export default AuthLayout;
