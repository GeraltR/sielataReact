import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Backdrop } from "@mui/material";
import ModalSpinner from "../main/ModalSpinner";

function CategorySelection(props) {
  const [loading, setLoadaing] = useState(true);
  const [categories, setCategories] = useState({
    categories: [],
    loadind: true,
  });

  const getCategories = async (klasa) => {
    // await csrf();
    const { data } = await axios.get("/api/categories/K");
    if (data.status === 200)
      setCategories({ categories: data.categories, loading: false });
    setLoadaing(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      ></Backdrop>
      <ModalSpinner visibled={loading} />
      <div className="flex items-center me-4 mb-2">
        <input
          checked
          id="kartonRadio"
          type="radio"
          value="K"
          name="default-radio"
          className="w-5 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"
        />
        <label
          htmlFor="kartonRadio"
          className="ms-2 text-base font-medium text-gray-900"
        >
          Karton
        </label>
      </div>
      <div className="flex items-center mb-2">
        <input
          id="plastikRadio"
          type="radio"
          value="P"
          name="default-radio"
          className="w-5 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"
        />
        <label
          htmlFor="plastikRadio2"
          className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300"
        >
          Plastik
        </label>
      </div>
      <select className="bg-gray-50 mb-4 py-3 p-5 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        {categories.categories.map((category) => (
          <option key={category.idkat}>
            {category.symbol}
            {category.nazwa}
          </option>
        ))}
      </select>
    </>
  );
}

export default CategorySelection;
