import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { transactionCreate } from "../../slices/sliceTransaction";

export default function TransactionsCreate() {
    const dispatch = useDispatch();
    const { createStatus } = useSelector((state) => state.transaction);
    const { stateProducts } = useSelector((state) => state.products);
    const { stateAuth } = useSelector((state) => state.session);
    const navigate = useNavigate();

    const [nameProdTrans, setNameProdTrans] = useState("");
    const [qtyTrans, setQtyTrans] = useState("");
    const [priceTrans, setPriceTrans] = useState("");
    const [totalTrans, setTotalTrans] = useState("");
    const [dateTrans, setDateTrans] = useState("");
    const [statusTrans, setStatusTrans] = useState("");

    const handleCreateResupply = async (e) => {
        e.preventDefault();

        dispatch(transactionCreate({
            transactionUser: stateAuth.user_id,
            transactionProd: nameProdTrans,
            transactionQty: qtyTrans,
            transactionPrice: priceTrans,
            transactionTotal: totalTrans,
            transactionDate: dateTrans,
            transactionStatus: statusTrans,
        }));

        setNameProdTrans("");
        setQtyTrans("");
        setPriceTrans("");
        setTotalTrans("");
        setDateTrans("");
        setStatusTrans("");
        navigate("/admin/transactions");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Membuat Transaction</h1>
                <form onSubmit={handleCreateResupply}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Produk :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNameProdTrans(e.target.value)}
                            required
                            defaultValue="cat"
                        >
                            <option value="cat" disabled hidden>
                                Pilih Produk
                            </option>
                            {/* memanggil isi dari kategori menggunakan state */}
                            {stateProducts && stateProducts.map((item) => (
                                <option key={item.product_id} value={item.product_id}>
                                    ({item.category_name}) {item.product_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Quantity :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Isi Kuantitas"
                            value={qtyTrans}
                            onChange={(e) => setQtyTrans(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Unit Price :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Isi Harga Per Unit"
                            value={priceTrans}
                            onChange={(e) => setPriceTrans(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Total Price :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Isi Total Harga"
                            value={totalTrans}
                            onChange={(e) => setTotalTrans(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tanggal Transaksi :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            placeholder="Isi Tanggal Transaksi Produk"
                            value={dateTrans}
                            onChange={(e) => setDateTrans(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Status Resupply :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setStatusTrans(e.target.value)}
                            required
                            defaultValue="cat"
                        >
                            <option value="cat" disabled hidden>
                                Pilih Status
                            </option>
                            <option value="po selesai">
                                PO Selesai
                            </option>
                            <option value="pending">
                                Pending
                            </option>
                            {/* memanggil isi dari kategori menggunakan state */}
                            {/* {stateProducts && stateProducts.map((item) => (
                                <option key={item.product_id} value={item.product_id}>
                                    ({item.category_name}) {item.product_name}
                                </option>
                            ))} */}
                        </select>
                    </div>
                    <button type="submit" className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 rounded">
                        {createStatus === "pending" ? "Submitting" : "Submit"}
                    </button>
                </form>
            </div>

        </div>
    );
}
