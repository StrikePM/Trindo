import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesCreate } from "../../slices/sliceCategories";

export default function CategroiesCreate() {
    const dispatch = useDispatch();
    const { createStatus } = useSelector((state) => state.categories);
    const navigate = useNavigate();

    const [nameCategory, setNameCategory] = useState("");
    const [descCategory, setDescCategory] = useState("");

    const handleCreateCategories = async (e) => {
        e.preventDefault();
        
        dispatch(categoriesCreate({
            categoryName: nameCategory,
            categoryDesc: descCategory,
        }));

        setNameCategory("");
        setDescCategory(""); 
        navigate("/admin/categories"); 
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Membuat Kategori</h1>
                <form onSubmit={handleCreateCategories}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Kategori :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Nama Kategori"
                            value={nameCategory}
                            onChange={(e) => setNameCategory(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Deskripsi Kategori :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Deskripsi Kategori"
                            value={descCategory}
                            onChange={(e) => setDescCategory(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 rounded">
                        {createStatus === "pending" ? "Submitting" : "Submit"}
                    </button>
                </form>
            </div>
            
        </div>
    );
}
