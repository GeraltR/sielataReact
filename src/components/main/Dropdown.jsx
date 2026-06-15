import MenuItems from "./MenuItems";

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;

  return (
    <ul
      className={`z-10 ${
        dropdown ? "block" : "hidden"
      } absolute min-w-max item-center flex-col bg-neutral-500 px-4 leading-7 rounded-lg shadow-2xl`}
    >
      {submenus.map((submenu, index) =>
        submenu.type === "separator" ? (
          <li key={index}>
            <hr className="border-neutral-400 my-1" />
          </li>
        ) : (
          <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
        )
      )}
    </ul>
  );
};

export default Dropdown;
