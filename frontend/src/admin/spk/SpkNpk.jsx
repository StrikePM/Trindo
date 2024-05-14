import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { miatkWrenchFetch } from "../../slices/sliceMiatk";
import { npkWrenchCreate, npkWrenchDelete, rankWrenchCreate, rankWrenchDelete } from "../../slices/sliceRankWrench";

export default function SpkNpk() {
    const dispatch = useDispatch();
    const { stateMiatkWrench } = useSelector((state) => state.miatkWrench);
    const { stateCategories } = useSelector((state) => state.categories);
    const navigate = useNavigate();

    const [nilaiPreferensiKriteria, setNilaiPreferensiKriteria] = useState([]);
    const [indeksPreferensiMultikriteria, setIndeksPreferensiMultikriteria] = useState([]);
    const [leavingFlow, setLeavingFlow] = useState([]);
    const [enteringFlow, setEnteringFlow] = useState([]);
    const [netFlow, setNetFlow] = useState([]);

    //tabel
    const [rowNpk, setRowNpk] = useState([]);
    const [columnNpk, setColumnNpk] = useState([]);
    const [rowIpm, setRowIpm] = useState([]);
    const [columnIpm, setColumnIpm] = useState([]);
    const [rowLf, setRowLf] = useState([]);
    const [columnLf, setColumnLf] = useState([]);
    const [rowEf, setRowEf] = useState([]);
    const [columnEf, setColumnEf] = useState([]);
    const [rowNf, setRowNf] = useState([]);
    const [columnNf, setColumnNf] = useState([]);

    useEffect(() => {
        dispatch(miatkWrenchFetch());
    }, []);

    const handleNpk = async () => {
        const npk1 = [];
        const npkTable = [];
        for (let i = 0; i < stateMiatkWrench.length; i++) {
            const ei = stateMiatkWrench[i];
            const npk2 = [];
            for (let j = 0; j < stateMiatkWrench.length; j++) {
                const ej = stateMiatkWrench[j];

                let salePrice = 0;
                let buyPrice = 0;
                let stock = 0;
                let saleAmount = 0;
                let buyAmount = 0;

                salePrice = parseInt(ei.harga_jual_produk, 10) - parseInt(ej.harga_jual_produk, 10);
                if (salePrice <= 0) {
                    salePrice = 0;
                } else if (salePrice > 0) {
                    salePrice = 1;
                }

                buyPrice = parseInt(ei.harga_beli_produk, 10) - parseInt(ej.harga_beli_produk, 10);
                if (buyPrice <= 0) {
                    buyPrice = 0;
                } else if (buyPrice > 0) {
                    buyPrice = 1;
                }

                stock = parseInt(ei.stok_produk, 10) - parseInt(ej.stok_produk, 10);
                if (stock <= 0) {
                    stock = 0;
                } else if (buyPrice > 0) {
                    stock = 1;
                }

                saleAmount = parseInt(ei.jumlah_penjualan_produk, 10) - parseInt(ej.jumlah_penjualan_produk, 10);
                if (saleAmount <= 0) {
                    saleAmount = 0;
                } else if (buyPrice > 0) {
                    saleAmount = 1;
                }

                buyAmount = parseInt(ei.jumlah_pembelian_produk, 10) - parseInt(ej.jumlah_pembelian_produk, 10);
                if (buyAmount <= 0) {
                    buyAmount = 0;
                } else if (buyPrice > 0) {
                    buyAmount = 1;
                }

                npk2.push({
                    pSalePrice: salePrice,
                    pBuyPrice: buyPrice,
                    pStock: stock,
                    pSaleAmount: saleAmount,
                    pBuyAmount: buyAmount
                });

                npkTable.push({
                    pSalePrice: salePrice,
                    pBuyPrice: buyPrice,
                    pStock: stock,
                    pSaleAmount: saleAmount,
                    pBuyAmount: buyAmount
                });
            }
            npk1.push(npk2);
        }
        console.log(npkTable);
        setNilaiPreferensiKriteria(npk1);

        const npkRows =
            npkTable &&
            npkTable.map((item, index) => {
                return {
                    id: index + 1,
                    salePrice: item.pSalePrice,
                    buyPrice: item.pBuyPrice,
                    pStock: item.pStock,
                    saleAmount: item.pSaleAmount,
                    buyAmount: item.pBuyAmount,
                };
            });
        const validNpkRows = npkRows ? npkRows.filter((row) => row.id !== undefined && row.id !== null) : [];

        const npkCol = [
            { field: "id", headerName: "No", width: 50 },
            { field: "salePrice", headerName: "Harga Jual (K1)", width: 120 },
            { field: "buyPrice", headerName: "Harga Beli (K2)", width: 120 },
            { field: "pStock", headerName: "Stok Produk (K3)", width: 120 },
            { field: "saleAmount", headerName: "Jumlah Penjualan (K4)", width: 160 },
            { field: "buyAmount", headerName: "Jumlah Pembelian (K5)", width: 160 },
        ];
        setRowNpk(validNpkRows);
        setColumnNpk(npkCol);
    }
    console.log(rowNpk);

    const handleIpm = async () => {
        const ipm1 = [];
        const ipmTable = [];
        for (let i = 0; i < nilaiPreferensiKriteria.length; i++) {
            const ei = nilaiPreferensiKriteria[i];
            const ipm2 = [];
            for (let j = 0; j < nilaiPreferensiKriteria.length; j++) {
                const ej = ei[j];

                let hasil = 0;
                hasil = 1 / 5 * (ej.pSalePrice + ej.pBuyPrice + ej.pStock + ej.pSaleAmount + ej.pBuyAmount);

                ipm2.push({
                    hasilIpm: hasil
                })

                ipmTable.push({
                    hasilIpm: hasil
                })
            }
            ipm1.push(ipm2);
        }
        console.log(ipmTable);
        setIndeksPreferensiMultikriteria(ipm1);

        const ipmRows =
            ipmTable &&
            ipmTable.map((item, index) => {
                return {
                    id: index + 1,
                    ipmHasil: item.hasilIpm,
                };
            });
        const validIpmRows = ipmRows ? ipmRows.filter((row) => row.id !== undefined && row.id !== null) : [];

        const ipmCol = [
            { field: "id", headerName: "No", width: 50 },
            { field: "ipmHasil", headerName: "Hasil", width: 80 },
        ];
        setRowIpm(validIpmRows);
        setColumnIpm(ipmCol);
    }

    const handleLf = async () => {
        const lf = [];
        for (let i = 0; i < indeksPreferensiMultikriteria.length; i++) {
            const element = indeksPreferensiMultikriteria[i];
            const sum = element.reduce((acc, current) => acc + current.hasilIpm, 0);
            const hasil = 1 / (5 - 1) * sum;
            lf.push({
                hasilLf: hasil
            });
        }
        console.log(lf);
        setLeavingFlow(lf);

        const lfRows =
            lf &&
            lf.map((item, index) => {
                return {
                    id: index + 1,
                    lfHasil: item.hasilLf,
                };
            });
        const validLfRows = lfRows ? lfRows.filter((row) => row.id !== undefined && row.id !== null) : [];

        const lfCol = [
            { field: "id", headerName: "No", width: 50 },
            { field: "lfHasil", headerName: "Hasil", width: 120 },
        ];
        setRowLf(validLfRows);
        setColumnLf(lfCol);
    }

    const handleEf = async () => {
        const ef = [];
        for (let i = 0; i < indeksPreferensiMultikriteria.length; i++) {
            const sumFirstIndex = indeksPreferensiMultikriteria.reduce((acc, current) => {
                return acc + (current[i]?.hasilIpm || 0);
            }, 0);
            const hasil = 1 / (5 - 1) * sumFirstIndex;
            ef.push({
                hasilEf: hasil
            });
        }
        console.log(ef);
        setEnteringFlow(ef);

        const efRows =
            ef &&
            ef.map((item, index) => {
                return {
                    id: index + 1,
                    efHasil: item.hasilEf,
                };
            });
        const validEfRows = efRows ? efRows.filter((row) => row.id !== undefined && row.id !== null) : [];

        const efCol = [
            { field: "id", headerName: "No", width: 50 },
            { field: "efHasil", headerName: "Hasil", width: 120 },
        ];
        setRowEf(validEfRows);
        setColumnEf(efCol);
    }

    const handleNf = async () => {
        const nf = [];
        for (let i = 0; i < leavingFlow.length; i++) {
            const hasil = leavingFlow[i].hasilLf - enteringFlow[i].hasilEf;
            nf.push({
                hasilNf: hasil
            });
        }
        console.log(nf);
        setNetFlow(nf);

        const nfRows =
            nf &&
            nf.map((item, index) => {
                return {
                    id: index + 1,
                    nfHasil: item.hasilNf,
                };
            });
        const validNfRows = nfRows ? nfRows.filter((row) => row.id !== undefined && row.id !== null) : [];

        const nfCol = [
            { field: "id", headerName: "No", width: 50 },
            { field: "nfHasil", headerName: "Hasil", width: 120 },
        ];
        setRowNf(validNfRows);
        setColumnNf(nfCol);
    }

    const handleRank = async () => {
        const newNetFlow = stateMiatkWrench.map((item, index) => {
            return {
                product_id: item.id_produk,
                category_id: item.id_kategori,
                hasilNf: netFlow[index] ? netFlow[index].hasilNf : null
            };
        });

        const rank = newNetFlow.sort((a, b) => b.hasilNf - a.hasilNf);
        console.log(rank);

        if (stateMiatkWrench[0].id_kategori == 1) {
            await dispatch(rankWrenchDelete());
            for (let i = 0; i < rank.length; i++) {
                const element = rank[i];
                await dispatch(rankWrenchCreate({
                    productId: element.product_id,
                    productCategory: element.category_id,
                    netFlow: element.hasilNf
                }))
            }
        }else if (stateMiatkWrench[0].id_kategori == 2) {
            // await dispatch(rankHammerDelete());
            // for (let i = 0; i < rank.length; i++) {
            //     const element = rank[i];
            //     await dispatch(rankHammerCreate({
            //         productId: element.product_id,
            //         categoryId: element.category_id,
            //         netFlow: element.hasilNf
            //     }))
            // }
        }
    }

    console.log(stateMiatkWrench);
    // mengeluarkan isi data dari dalam state produk
    const rows =
        stateMiatkWrench &&
        stateMiatkWrench.map((item) => {
            return {
                id: item.alternatif_id,
                pName: item.nama_produk,
                salePrice: item.harga_jual_produk.toLocaleString(),
                buyPrice: item.harga_beli_produk.toLocaleString(),
                pStock: item.stok_produk,
                saleAmount: item.jumlah_penjualan_produk,
                buyAmount: item.jumlah_pembelian_produk,
            };
        });

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : [];

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "pName", headerName: "Nama Produk", width: 120 },
        { field: "salePrice", headerName: "Harga Jual (Rp.)", width: 120 },
        { field: "buyPrice", headerName: "Harga Beli (Rp.)", width: 120 },
        { field: "pStock", headerName: "Stok Produk", width: 120 },
        { field: "saleAmount", headerName: "Jumlah Penjualan", width: 150 },
        { field: "buyAmount", headerName: "Jumlah Pembelian", width: 150 },
    ];

    return (
        <div className="flex flex-col w-full h-full">
            <div className="w-[1200px] h-fit">
                <h1 className="font-bold text-xl mb-3">Menghitung Nilai Preferensi Kriteria</h1>
                <div style={{ height: 400, width: "80%" }}>
                    <DataGrid
                        rows={validRows}
                        columns={columns}
                        getRowHeight={() => 'auto'}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
            <div className="h-fit w-full bg-red-100">
                <h1 className="font-bold text-xl mb-3">Nilai Preferensi Kriteria</h1>
                <button onClick={handleNpk} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                    Hitung Nilai Preferensi Kriteria
                </button>
                <div style={{ height: 400, width: "70%" }}>
                    <DataGrid
                        rows={rowNpk ? rowNpk : []}
                        columns={columnNpk}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 13, page: 0 },
                            },
                        }}
                        getRowHeight={() => 'auto'}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
            <div className="flex flex-row">
                <div className="h-fit w-full bg-green-100">
                    <h1 className="font-bold text-xl mb-3">Indeks Preferensi Multikriteria</h1>
                    <button onClick={handleIpm} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                        Hitung Indeks Preferensi Multikriteria
                    </button>
                    <div style={{ height: 400, width: "70%" }}>
                        <DataGrid
                            rows={rowIpm ? rowIpm : []}
                            columns={columnIpm}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 13, page: 0 },
                                },
                            }}
                            getRowHeight={() => 'auto'}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                </div>
                <div className="h-fit w-full bg-blue-100">
                    <h1 className="font-bold text-xl mb-3">Leaving Flow</h1>
                    <button onClick={handleLf} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                        Hitung Leaving Flow
                    </button>
                    <div style={{ height: 400, width: "70%" }}>
                        <DataGrid
                            rows={rowLf ? rowLf : []}
                            columns={columnLf}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 13, page: 0 },
                                },
                            }}
                            getRowHeight={() => 'auto'}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                </div>
                <div className="h-fit w-full bg-orange-100">
                    <h1 className="font-bold text-xl mb-3">Entering Flow</h1>
                    <button onClick={handleEf} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                        Hitung Entering Flow
                    </button>
                    <div style={{ height: 400, width: "70%" }}>
                        <DataGrid
                            rows={rowEf ? rowEf : []}
                            columns={columnEf}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 13, page: 0 },
                                },
                            }}
                            getRowHeight={() => 'auto'}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="h-fit w-full bg-purple-100">
                    <h1 className="font-bold text-xl mb-3">Net Flow</h1>
                    <button onClick={handleNf} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                        Hitung Net Flow
                    </button>
                    <div style={{ height: 400, width: "50%" }}>
                        <DataGrid
                            rows={rowNf ? rowNf : []}
                            columns={columnNf}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 13, page: 0 },
                                },
                            }}
                            getRowHeight={() => 'auto'}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                </div>
                <div className="h-fit w-full bg-purple-100">
                    <h1 className="font-bold text-xl mb-3">Perangkingan</h1>
                    <button onClick={handleRank} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                        Perangkingan
                    </button>
                    <div style={{ height: 400, width: "50%" }}>
                        <DataGrid
                            rows={rowNf ? rowNf : []}
                            columns={columnNf}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 13, page: 0 },
                                },
                            }}
                            getRowHeight={() => 'auto'}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 