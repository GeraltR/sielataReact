import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItemsData } from "../../MenuItemsData";
import Dropdown from "./Dropdown";

function Navbar(props) {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      {MenuItemsData.map((menu, index) => {
        return (
          (props.user.admin === menu.permission ||
            (menu.permission === 2 && props.user.admin != 0)) && (
            <>
              <li key={`Main${index}`}>
                {menu.submenu ? (
                  <button
                    onMouseEnter={() => {
                      setDropDown((prev) => !prev);
                    }}
                  >
                    <Dropdown
                      submenus={menu.submenu}
                      showNav={props.showNav}
                      dropDown={dropDown}
                    />
                    {menu.title}
                  </button>
                ) : (
                  <Link
                    to={menu.url}
                    onClick={props.showNav}
                    onMouseLeave={() => {
                      setDropDown(() => false);
                    }}
                    onMouseEnter={() => {
                      setDropDown(() => false);
                    }}
                    className="block rounded py-2 pr-4 pl-3 text-white hover:text-yellow-500"
                  >
                    {menu.title}
                  </Link>
                )}
              </li>
            </>
          )
        );
      })}
    </>
  );
}

export default Navbar;

/* <li>
            <Link
              to="/"
              onClick={showNav}
              className="block rounded py-2 pr-4 pl-3 text-white hover:text-yellow-500"
            >
              Moje dane i modele
            </Link>
          </li>
          {user.admin === 1 && (
            <>
              <li>
                <Link
                  to="/listresults"
                  onClick={showNav}
                  className="block rounded py-2 pr-4 pl-3 text-white hover:text-yellow-500"
                >
                  Listy
                </Link>
              </li>
              <li>
                <Link
                  to="/registeredmodels"
                  onClick={showNav}
                  className="block rounded py-2 pr-4 pl-3 text-white hover:text-yellow-500"
                >
                  Zarządzanie
                </Link>
              </li>
              <li>
                <Link
                  to="/prixies"
                  onClick={showNav}
                  className="block rounded py-2 pr-4 pl-3 text-white hover:text-yellow-500"
                >
                  Nagrody
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              to="/jury"
              onClick={showNav}
              className="block rounded py-2 pr-4 pl-3 text-white hover:text-yellow-500"
            >
              Sędziowanie
            </Link>
          </li> */
