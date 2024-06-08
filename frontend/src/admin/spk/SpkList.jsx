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
    const { stateCriteria } = useSelector((state) => state.criteria);
    
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
            if (parseInt(hargaJualP, 10) >= stateCriteria[0].sub_start_1 && parseInt(hargaJualP, 10) <= stateCriteria[0].sub_end_1) {
                salePrice = stateCriteria[0].sub_weight_1;
            } else if (parseInt(hargaJualP, 10) >= stateCriteria[0].sub_start_2 && parseInt(hargaJualP, 10) <= stateCriteria[0].sub_end_2) {
                salePrice = stateCriteria[0].sub_weight_2;
            } else if (parseInt(hargaJualP, 10) >= stateCriteria[0].sub_start_3 && parseInt(hargaJualP, 10) <= stateCriteria[0].sub_end_3) {
                salePrice = stateCriteria[0].sub_weight_3;
            } else if (parseInt(hargaJualP, 10) >= stateCriteria[0].sub_start_4 && parseInt(hargaJualP, 10) <= stateCriteria[0].sub_end_4) {
                salePrice = stateCriteria[0].sub_weight_4;
            } else if (parseInt(hargaJualP, 10) >= stateCriteria[0].sub_start_5) {
                salePrice = stateCriteria[0].sub_weight_5;
            }

            //perbandingan alternatif terhadap kriteria harga beli
            if (parseInt(hargaBeliP, 10) >= stateCriteria[1].sub_start_1 && parseInt(hargaBeliP, 10) <= stateCriteria[1].sub_end_1) {
                buyPrice = stateCriteria[1].sub_weight_1;
            } else if (parseInt(hargaBeliP, 10) >= stateCriteria[1].sub_start_2 && parseInt(hargaBeliP, 10) <= stateCriteria[1].sub_end_2) {
                buyPrice = stateCriteria[1].sub_weight_2;
            } else if (parseInt(hargaBeliP, 10) >= stateCriteria[1].sub_start_3 && parseInt(hargaBeliP, 10) <= stateCriteria[1].sub_end_3) {
                buyPrice = stateCriteria[1].sub_weight_3;
            } else if (parseInt(hargaBeliP, 10) >= stateCriteria[1].sub_start_4 && parseInt(hargaBeliP, 10) <= stateCriteria[1].sub_end_4) {
                buyPrice = stateCriteria[1].sub_weight_4;
            } else if (parseInt(hargaBeliP, 10) >= stateCriteria[1].sub_start_5) {
                buyPrice = stateCriteria[1].sub_weight_5;
            }

            //perbandingan alternatif terhadap kriteria stok
            if (parseInt(stokP, 10) >= stateCriteria[2].sub_start_1 && parseInt(stokP, 10) <= stateCriteria[2].sub_end_1) {
                stock = stateCriteria[2].sub_weight_1;
            } else if (parseInt(stokP, 10) >= stateCriteria[2].sub_start_2 && parseInt(stokP, 10) <= stateCriteria[2].sub_end_2) {
                stock = stateCriteria[2].sub_weight_2;
            } else if (parseInt(stokP, 10) >= stateCriteria[2].sub_start_3 && parseInt(stokP, 10) <= stateCriteria[2].sub_end_3) {
                stock = stateCriteria[2].sub_weight_3;
            } else if (parseInt(stokP, 10) >= stateCriteria[2].sub_start_4 && parseInt(stokP, 10) <= stateCriteria[2].sub_end_4) {
                stock = stateCriteria[2].sub_weight_4;
            } else if (parseInt(stokP, 10) > stateCriteria[2].sub_start_5) {
                stock = stateCriteria[2].sub_weight_5;
            }

            //perbandingan alternatif terhadap kriteria jumlah penjualan
            if (parseInt(jumlahPenjualanP, 10) >= stateCriteria[3].sub_start_1 && parseInt(jumlahPenjualanP, 10) <= stateCriteria[3].sub_end_1) {
                saleAmount = stateCriteria[3].sub_weight_1;
            } else if (parseInt(jumlahPenjualanP, 10) >= stateCriteria[3].sub_start_2 && parseInt(jumlahPenjualanP, 10) <= stateCriteria[3].sub_end_2) {
                saleAmount = stateCriteria[3].sub_weight_2;
            } else if (parseInt(jumlahPenjualanP, 10) >= stateCriteria[3].sub_start_3 && parseInt(jumlahPenjualanP, 10) <= stateCriteria[3].sub_end_3) {
                saleAmount = stateCriteria[3].sub_weight_3;
            } else if (parseInt(jumlahPenjualanP, 10) >= stateCriteria[3].sub_start_4 && parseInt(jumlahPenjualanP, 10) <= stateCriteria[3].sub_end_4) {
                saleAmount = stateCriteria[3].sub_weight_4;
            } else if (parseInt(jumlahPenjualanP, 10) > stateCriteria[3].sub_start_5) {
                saleAmount = stateCriteria[3].sub_weight_5;
            }

            //perbandingan alternatif terhadap kriteria jumlah pembelian
            if (parseInt(jumlahPembelianP, 10) >= stateCriteria[4].sub_start_1 && parseInt(jumlahPembelianP, 10) <= stateCriteria[4].sub_end_1) {
                buyAmount = stateCriteria[4].sub_weight_1;
            } else if (parseInt(jumlahPembelianP, 10) >= stateCriteria[4].sub_start_2 && parseInt(jumlahPembelianP, 10) <= stateCriteria[4].sub_end_2) {
                buyAmount = stateCriteria[4].sub_weight_2;
            } else if (parseInt(jumlahPembelianP, 10) >= stateCriteria[4].sub_start_3 && parseInt(jumlahPembelianP, 10) <= stateCriteria[4].sub_end_3) {
                buyAmount = stateCriteria[4].sub_weight_3;
            } else if (parseInt(jumlahPembelianP, 10) >= stateCriteria[4].sub_start_4 && parseInt(jumlahPembelianP, 10) <= stateCriteria[4].sub_end_4) {
                buyAmount = stateCriteria[4].sub_weight_4;
            } else if (parseInt(jumlahPembelianP, 10) > stateCriteria[4].sub_start_5) {
                buyAmount = stateCriteria[4].sub_weight_5;
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
        console.log(matrikWrench);
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
