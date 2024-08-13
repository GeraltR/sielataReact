import MenuItems from "./MenuItems";

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;

  return (
    <ul
      className={`z-10 ${
        dropdown ? "block" : "hidden"
      } absolute md:fixed item-center flex-col bg-neutral-600 px-4 leading-7 rounded-lg shadow-2xl`}
    >
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

export default Dropdown;
