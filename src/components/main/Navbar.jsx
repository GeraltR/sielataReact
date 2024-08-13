import { MenuItemsData } from "../../MenuItemsData.js";
import MenuItems from "./MenuItems";

const Navbar = ({ user }) => {
  const depthLevel = 0;

  return (
    <ul className="flex flex-col list-inside justify-center items-center flex-col md:flex-row md:space-x-10">
      {MenuItemsData.map((menu, index) => {
        return (
          menu.permission >= user.admin && (
            <MenuItems items={menu} key={index} depthLevel={depthLevel} />
          )
        );
      })}
    </ul>
  );
};

export default Navbar;
