import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { miatkWrenchCreate, miatkWrenchDelete } from "../../slices/sliceMiatk";

export default function SpkList() {
    const dispatch = useDispatch();
    const { stateProducts } = useSelector((state) => state.products);
    const { stateCategories } = useSelector((state) => state.categories);
    const { stateTransaction } = useSelector((state) => state.transaction);
    const { stateResupply } = useSelector((state) => state.resupply);

    const navigate = useNavigate();

    const [miatk, setMiatk] = useState([]);

    const handleSelectedProd = async (e) => {
        console.log(stateProducts.filter((item) => item.category_id == e));
        const matrikWrench = [];

        const selectedProdByCat = stateProducts.filter((item) => item.category_id == e);
        for (let i = 0; i < selectedProdByCat.length; i++) {
            const element = selectedProdByCat[i];

            //pengelompokan data
            const idP = element.product_id;
            const namaP = element.product_name;
            const kategoriP = element.category_id;
            const hargaJualP = element.product_price;
            const selectedProdByResupply = stateResupply.filter((item) => item.product_id == element.product_id).length > 0 ? stateResupply.filter((item) => item.product_id == element.product_id) : false;
            const hargaBeliP = selectedProdByResupply != false ? selectedProdByResupply.find((item) => item.resupply_id).resupply_price : element.product_price / (1 + 0.5);
            const stokP = element.product_stock;
            const jumlahPenjualanP = stateTransaction.filter((item) => item.product_id == element.product_id) ? stateTransaction.filter((item) => item.product_id == element.product_id).length : 0;
            const jumlahPembelianP = stateResupply.filter((item) => item.product_id == element.product_id) ? stateResupply.filter((item) => item.product_id == element.product_id).length : 0;

            let salePrice = 0;
            let buyPrice = 0;
            let stock = 0;
            let saleAmount = 0;
            let buyAmount = 0;

            //perbandingan alternatif terhadap kriteria harga jual
            if (parseInt(hargaJualP, 10) >= 500 && parseInt(hargaJualP, 10) <= 49999) {
                salePrice = 5;
            } else if (parseInt(hargaJualP, 10) >= 50000 && parseInt(hargaJualP, 10) <= 99999) {
                salePrice = 4;
            } else if (parseInt(hargaJualP, 10) >= 100000 && parseInt(hargaJualP, 10) <= 599999) {
                salePrice = 3;
            } else if (parseInt(hargaJualP, 10) >= 600000 && parseInt(hargaJualP, 10) <= 4999999) {
                salePrice = 2;
            } else if (parseInt(hargaJualP, 10) >= 5000000) {
                salePrice = 1;
            }

            //perbandingan alternatif terhadap kriteria harga beli
            if (parseInt(hargaBeliP, 10) >= 500 && parseInt(hargaBeliP, 10) <= 49999) {
                buyPrice = 5;
            } else if (parseInt(hargaBeliP, 10) >= 50000 && parseInt(hargaBeliP, 10) <= 99999) {
                buyPrice = 4;
            } else if (parseInt(hargaBeliP, 10) >= 100000 && parseInt(hargaBeliP, 10) <= 599999) {
                buyPrice = 3;
            } else if (parseInt(hargaBeliP, 10) >= 600000 && parseInt(hargaBeliP, 10) <= 4999999) {
                buyPrice = 2;
            } else if (parseInt(hargaBeliP, 10) >= 5000000) {
                buyPrice = 1;
            }

            //perbandingan alternatif terhadap kriteria stok
            if (parseInt(stokP, 10) >= 0 && parseInt(stokP, 10) <= 5) {
                stock = 1;
            } else if (parseInt(stokP, 10) >= 6 && parseInt(stokP, 10) <= 10) {
                stock = 2;
            } else if (parseInt(stokP, 10) >= 11 && parseInt(stokP, 10) <= 15) {
                stock = 3;
            } else if (parseInt(stokP, 10) >= 16 && parseInt(stokP, 10) <= 20) {
                stock = 4;
            } else if (parseInt(stokP, 10) > 20) {
                stock = 5;
            }

            //perbandingan alternatif terhadap kriteria jumlah penjualan
            if (parseInt(jumlahPenjualanP, 10) >= 0 && parseInt(jumlahPenjualanP, 10) <= 5) {
                saleAmount = 1;
            } else if (parseInt(jumlahPenjualanP, 10) >= 6 && parseInt(jumlahPenjualanP, 10) <= 10) {
                saleAmount = 2;
            } else if (parseInt(jumlahPenjualanP, 10) >= 11 && parseInt(jumlahPenjualanP, 10) <= 15) {
                saleAmount = 3;
            } else if (parseInt(jumlahPenjualanP, 10) >= 16 && parseInt(jumlahPenjualanP, 10) <= 20) {
                saleAmount = 4;
            } else if (parseInt(jumlahPenjualanP, 10) > 20) {
                saleAmount = 5;
            }

            //perbandingan alternatif terhadap kriteria jumlah pembelian
            if (parseInt(jumlahPembelianP, 10) >= 0 && parseInt(jumlahPembelianP, 10) <= 5) {
                buyAmount = 1;
            } else if (parseInt(jumlahPembelianP, 10) >= 6 && parseInt(jumlahPembelianP, 10) <= 10) {
                buyAmount = 2;
            } else if (parseInt(jumlahPembelianP, 10) >= 11 && parseInt(jumlahPembelianP, 10) <= 15) {
                buyAmount = 3;
            } else if (parseInt(jumlahPembelianP, 10) >= 16 && parseInt(jumlahPembelianP, 10) <= 20) {
                buyAmount = 4;
            } else if (parseInt(jumlahPembelianP, 10) > 20) {
                buyAmount = 5;
            }

            //memasukan iterasi for kedalam state array
            matrikWrench.push({
                pId: idP,
                pName: namaP,
                pCategory: kategoriP,
                pSalePrice: salePrice,
                pBuyPrice: buyPrice,
                pStock: stock,
                pSaleAmount: saleAmount,
                pBuyAmount: buyAmount
            });
        }
        setMiatk(matrikWrench);
    };

    const handleMiatk = async () => {
        console.log(miatk);
        await dispatch(miatkWrenchDelete());
        for (let i = 0; i < miatk.length; i++) {
            const element = miatk[i];
            await dispatch(miatkWrenchCreate({
                productId: element.pId,
                productName: element.pName,
                productCategory: element.pCategory,
                productSalePrice: element.pSalePrice,
                productBuyPrice: element.pBuyPrice,
                productStock: element.pStock,
                productSaleAmount: element.pSaleAmount,
                productBuyAmount: element.pBuyAmount
            }));
        }
        navigate('/admin');
    }

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">SPK Promethee</h1>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Kategori Produk :
                    </label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => handleSelectedProd(e.target.value)}
                        required
                        defaultValue="cat"
                    >
                        <option value="cat" disabled hidden>
                            Pilih Kategori
                        </option>
                        {/* memanggil isi dari kategori menggunakan state */}
                        {stateCategories && stateCategories.map((item) => (
                            <option key={item.category_id} value={item.category_id}>
                                {item.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={handleMiatk} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 rounded">
                    Perbandingan Alternatif Terhadap Kriteria
                </button>
            </div>
        </div>
    );
}
