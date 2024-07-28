import { Link } from "react-router-dom";
import { MenuItemsData } from "../../MenuItemsData";
import Dropdown from "./Dropdown";

function Navbar(props) {
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
                      props.setDropDown((prev) => !prev);
                    }}
                  >
                    <Dropdown
                      submenus={menu.submenu}
                      showNav={props.showNav}
                      dropDown={props.dropDown}
                    />
                    {menu.title}
                  </button>
                ) : (
                  <Link
                    to={menu.url}
                    onClick={props.showNav}
                    onMouseLeave={() => {
                      props.setDropDown(() => false);
                    }}
                    onMouseEnter={() => {
                      props.setDropDown(() => false);
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
