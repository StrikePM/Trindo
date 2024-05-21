import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { miatkWrenchFetch } from "../../slices/sliceMiatk";
import { npkWrenchCreate, npkWrenchDelete, rankWrenchCreate, rankWrenchDelete } from "../../slices/sliceRankWrench";
import { rankHammerCreate, rankHammerDelete } from "../../slices/sliceRankHammer";
import { rankDrillCreate, rankDrillDelete } from "../../slices/sliceRankDrill";
import { rankGrinderCreate, rankGrinderDelete } from "../../slices/sliceRankGrinder";

export default function SpkNpk() {
    const dispatch = useDispatch();
    const { stateMiatkWrench } = useSelector((state) => state.miatkWrench);
    const { stateRankWrench } = useSelector((state) => state.rankWrench);
    const { stateRankHammer } = useSelector((state) => state.rankHammer);
    const { stateRankDrill } = useSelector((state) => state.rankDrill);
    const { stateRankGrinder } = useSelector((state) => state.rankGrinder);
    const { stateProducts } = useSelector((state) => state.products);
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
    const [rowRank, setRowRank] = useState([]);
    const [columnRank, setColumnRank] = useState([]);

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

                let salePrice = parseInt(ei.harga_jual_produk, 10) - parseInt(ej.harga_jual_produk, 10);
                let buyPrice = parseInt(ei.harga_beli_produk, 10) - parseInt(ej.harga_beli_produk, 10);
                let stock = parseInt(ei.stok_produk, 10) - parseInt(ej.stok_produk, 10);
                let saleAmount = parseInt(ei.jumlah_penjualan_produk, 10) - parseInt(ej.jumlah_penjualan_produk, 10);
                let buyAmount = parseInt(ei.jumlah_pembelian_produk, 10) - parseInt(ej.jumlah_pembelian_produk, 10);

                salePrice = salePrice > 0 ? 1 : 0;
                buyPrice = buyPrice > 0 ? 1 : 0;
                stock = stock > 0 ? 1 : 0;
                saleAmount = saleAmount > 0 ? 1 : 0;
                buyAmount = buyAmount > 0 ? 1 : 0;

                const result = {
                    pSalePrice: salePrice,
                    pBuyPrice: buyPrice,
                    pStock: stock,
                    pSaleAmount: saleAmount,
                    pBuyAmount: buyAmount
                };

                npk2.push(result);
                npkTable.push(result);
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
            { field: "salePrice", headerName: "Harga Jual(K1)", width: 90 },
            { field: "buyPrice", headerName: "Harga Beli(K2)", width: 90 },
            { field: "pStock", headerName: "Stok Produk(K3)", width: 90 },
            { field: "saleAmount", headerName: "Jumlah Penjualan(K4)", width: 140 },
            { field: "buyAmount", headerName: "Jumlah Pembelian(K5)", width: 140 },
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
            const hasil = parseFloat(1 / (5 - 1) * sum).toFixed(2);
            lf.push({
                hasilLf: parseFloat(hasil)
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
            const hasil = parseFloat(1 / (5 - 1) * sumFirstIndex).toFixed(2);
            ef.push({
                hasilEf: parseFloat(hasil)
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
            const hasil = parseFloat(leavingFlow[i].hasilLf - enteringFlow[i].hasilEf).toFixed(2);
            nf.push({
                hasilNf: parseFloat(hasil)
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

        let rankRows = [];
        let validRankRows = 0;
        let rankCol = [];

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
            rankRows =
                stateRankWrench &&
                stateRankWrench.map((item) => {
                    return {
                        id: item.alternatif_id,
                        namaProduk: stateProducts && stateProducts.find((itemP) => itemP.product_id == item.product_id).product_name,
                        hasilRank: item.net_flow.toFixed(2)
                    };
                });
            validRankRows = rankRows ? rankRows.filter((row) => row.id !== undefined && row.id !== null) : [];

            rankCol = [
                { field: "id", headerName: "Rank", width: 50 },
                { field: "namaProduk", headerName: "Nama Produk", width: 120 },
                { field: "hasilRank", headerName: "Net Flow", width: 120 },
            ];
        } else if (stateMiatkWrench[0].id_kategori == 2) {
            await dispatch(rankHammerDelete());
            for (let i = 0; i < rank.length; i++) {
                const element = rank[i];
                await dispatch(rankHammerCreate({
                    productId: element.product_id,
                    productCategory: element.category_id,
                    netFlow: element.hasilNf
                }))
            }
            rankRows =
                stateRankHammer &&
                stateRankHammer.map((item) => {
                    return {
                        id: item.alternatif_id,
                        namaProduk: stateProducts && stateProducts.find((itemP) => itemP.product_id == item.product_id).product_name,
                        hasilRank: item.net_flow.toFixed(2)
                    };
                });
            validRankRows = rankRows ? rankRows.filter((row) => row.id !== undefined && row.id !== null) : [];

            rankCol = [
                { field: "id", headerName: "Rank", width: 50 },
                { field: "namaProduk", headerName: "Nama Produk", width: 120 },
                { field: "hasilRank", headerName: "Net Flow", width: 120 },
            ];
        } else if (stateMiatkWrench[0].id_kategori == 3) {
            await dispatch(rankDrillDelete());
            for (let i = 0; i < rank.length; i++) {
                const element = rank[i];
                await dispatch(rankDrillCreate({
                    productId: element.product_id,
                    productCategory: element.category_id,
                    netFlow: element.hasilNf
                }))
            }
            rankRows =
                stateRankDrill &&
                stateRankDrill.map((item) => {
                    return {
                        id: item.alternatif_id,
                        namaProduk: stateProducts && stateProducts.find((itemP) => itemP.product_id == item.product_id).product_name,
                        hasilRank: item.net_flow.toFixed(2)
                    };
                });
            validRankRows = rankRows ? rankRows.filter((row) => row.id !== undefined && row.id !== null) : [];

            rankCol = [
                { field: "id", headerName: "Rank", width: 50 },
                { field: "namaProduk", headerName: "Nama Produk", width: 120 },
                { field: "hasilRank", headerName: "Net Flow", width: 120 },
            ];
        } else if (stateMiatkWrench[0].id_kategori == 4) {
            await dispatch(rankGrinderDelete());
            for (let i = 0; i < rank.length; i++) {
                const element = rank[i];
                await dispatch(rankGrinderCreate({
                    productId: element.product_id,
                    productCategory: element.category_id,
                    netFlow: element.hasilNf
                }))
            }
            rankRows =
                stateRankGrinder &&
                stateRankGrinder.map((item) => {
                    return {
                        id: item.alternatif_id,
                        namaProduk: stateProducts && stateProducts.find((itemP) => itemP.product_id == item.product_id).product_name,
                        hasilRank: item.net_flow.toFixed(2)
                    };
                });
            validRankRows = rankRows ? rankRows.filter((row) => row.id !== undefined && row.id !== null) : [];

            rankCol = [
                { field: "id", headerName: "Rank", width: 50 },
                { field: "namaProduk", headerName: "Nama Produk", width: 120 },
                { field: "hasilRank", headerName: "Net Flow", width: 120 },
            ];
        }
        setRowRank(validRankRows);
        setColumnRank(rankCol);
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
            <div className="flex flex-row h-fit w-full mt-[20px]">
                <div className="h-fit w-[65%]">
                    <h1 className="font-bold text-xl mb-3">Nilai Preferensi Kriteria</h1>
                    <button onClick={handleNpk} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                        Hitung Nilai Preferensi Kriteria
                    </button>
                    <div style={{ height: 400, width: "95%" }}>
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
                <div className="h-fit w-[35%]">
                    <h1 className="font-bold text-xl mb-3">Indeks Preferensi Multikriteria</h1>
                    <button onClick={handleIpm} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                        Hitung Indeks Preferensi Multikriteria
                    </button>
                    <div style={{ height: 400, width: "50%" }}>
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
            </div>
            <div className="flex flex-row mt-[20px]">
                <div className="h-fit w-full">
                    <h1 className="font-bold text-xl mb-3">Leaving Flow</h1>
                    <button onClick={handleLf} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                        Hitung Leaving Flow
                    </button>
                    <div style={{ height: 800, width: "70%" }}>
                        <DataGrid
                            rows={rowLf ? rowLf : []}
                            columns={columnLf}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 15, page: 0 },
                                },
                            }}
                            getRowHeight={() => 'auto'}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                </div>
                <div className="h-fit w-full">
                    <h1 className="font-bold text-xl mb-3">Entering Flow</h1>
                    <button onClick={handleEf} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                        Hitung Entering Flow
                    </button>
                    <div style={{ height: 800, width: "70%" }}>
                        <DataGrid
                            rows={rowEf ? rowEf : []}
                            columns={columnEf}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 15, page: 0 },
                                },
                            }}
                            getRowHeight={() => 'auto'}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                </div>
                <div className="h-fit w-full">
                    <h1 className="font-bold text-xl mb-3">Net Flow</h1>
                    <button onClick={handleNf} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                        Hitung Net Flow
                    </button>
                    <div style={{ height: 800, width: "70%" }}>
                        <DataGrid
                            rows={rowNf ? rowNf : []}
                            columns={columnNf}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 15, page: 0 },
                                },
                            }}
                            getRowHeight={() => 'auto'}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row mt-[20px]">
                <div className="h-fit w-full">
                    <h1 className="font-bold text-xl mb-3">Perangkingan</h1>
                    <button onClick={handleRank} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 mb-[10px] rounded">
                        Perangkingan
                    </button>
                    <div style={{ height: 800, width: "30%" }}>
                        <DataGrid
                            rows={rowRank ? rowRank : []}
                            columns={columnRank}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 15, page: 0 },
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