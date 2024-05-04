import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { brandCreate,brandEdit } from "../../slices/sliceBrand";

export default function BrandEdit() {
    const dispatch = useDispatch();
    const { createStatus, stateBrand } = useSelector((state) => state.brand);
    const { bId } = useParams();
    const navigate = useNavigate();

    const [nameBrand, setNameBrand] = useState("");
    const [descBrand, setDescBrand] = useState("");
    const selectedBrand = stateBrand.find((item) => item.brand_id === parseInt(bId, 10));
    console.log(bId);

    useEffect(() => {
        if (selectedBrand) {
            setNameBrand(selectedBrand.brand_name)
            setDescBrand(selectedBrand.brand_desc)
        }
    }, [bId, stateBrand]);

    const handleEditBrand = async (e) => {
        e.preventDefault();

        dispatch(brandEdit({
            brand: {
                brandId: parseInt(bId, 10),
                brandName: nameBrand,
                brandDesc: descBrand,
            }
        }));
        navigate("/admin/brand");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Edit Brand</h1>
                <form onSubmit={handleEditBrand}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Brand :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Nama Brand"
                            value={nameBrand}
                            onChange={(e) => setNameBrand(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Deskripsi Brand :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Deskripsi Brand"
                            value={descBrand}
                            onChange={(e) => setDescBrand(e.target.value)}
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
