import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { categoriesCreate, categoriesEdit } from "../../slices/sliceCategories";

export default function CategroiesEdit() {
    const dispatch = useDispatch();
    const { createStatus, stateCategories } = useSelector((state) => state.categories);
    const { cId } = useParams();
    const navigate = useNavigate();

    const [nameCategory, setNameCategory] = useState("");
    const [descCategory, setDescCategory] = useState("");
    const selectedCat = stateCategories.find((item) => item.category_id === parseInt(cId, 10));
    console.log(cId);

    useEffect(() => {
        if (selectedCat) {
            setNameCategory(selectedCat.category_name)
            setDescCategory(selectedCat.category_desc)
        }
    }, [cId, stateCategories]);

    const handleEditCategories = async (e) => {
        e.preventDefault();

        dispatch(categoriesEdit({
            category: {
                categoryId: parseInt(cId, 10),
                categoryName: nameCategory,
                categoryDesc: descCategory,
            }
        }));
        navigate("/admin/categories");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Edit Kategori</h1>
                <form onSubmit={handleEditCategories}>
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
