import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resupplyEdit } from "../../slices/sliceResupply";

export default function ResupplyEdit() {
    const dispatch = useDispatch();
    const { stateResupply, createStatus } = useSelector((state) => state.resupply);
    const { stateProducts } = useSelector((state) => state.products);
    const { rId } = useParams();
    const navigate = useNavigate();

    const [nameProdResupply, setNameProdResupply] = useState("");
    const [stockResupply, setStockResupply] = useState("");
    const [dateResupply, setDateResupply] = useState("");
    const selectedRes = stateResupply.find((item) => item.resupply_id === parseInt(rId, 10));

    useEffect(() => {
        if (selectedRes) {
            setNameProdResupply(selectedRes.product_id);
            setStockResupply(selectedRes.resupply_stock);
            setDateResupply(new Date(new Date(selectedRes.resupply_date).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]);
        }
    }, [rId, stateResupply]);

    const handleCreateResupply = async (e) => {
        e.preventDefault();

        dispatch(resupplyEdit({
            resupply: {
                resupplyId: parseInt(rId, 10),
                resupplyName: nameProdResupply,
                resupplyStock: stockResupply,
                resupplyDate: dateResupply,
            }
        }));

        setNameProdResupply("");
        setStockResupply("");
        setDateResupply("");
        navigate("/admin/resupply");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Membuat Resupply</h1>
                <form onSubmit={handleCreateResupply}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Produk :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNameProdResupply(e.target.value)}
                            required
                            defaultValue={nameProdResupply}
                        >
                            <option value="cat" disabled hidden>
                                Pilih Produk
                            </option>
                            {/* memanggil isi dari kategori menggunakan state */}
                            {stateProducts && stateProducts.map((item) => (
                                <option key={item.product_id} value={item.product_id}>
                                    {item.product_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Stock Resupply :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Isi Deskripsi Kategori"
                            value={stockResupply}
                            onChange={(e) => setStockResupply(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tanggal Resupply :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            placeholder="Isi Tanggal Resupply Produk"
                            value={dateResupply}
                            onChange={(e) => setDateResupply(e.target.value)}
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
