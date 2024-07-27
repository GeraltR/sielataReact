import { Link } from "react-router-dom";

function Dropdown({ showNav, submenus, dropDown }) {
  return (
    <>
      <ul
        className={`z-10 ${
          dropDown ? "block" : "hidden"
        } fixed bg-neutral-600 items-center px-4 leading-7 rounded-lg shadow-2xl`}
      >
        {submenus.map((submenu, index) => {
          //console.log(showNav);
          return (
            <li className="hover:text-yellow-500 my-4" key={index}>
              <Link to={submenu.url} onClick={showNav}>
                {submenu.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
