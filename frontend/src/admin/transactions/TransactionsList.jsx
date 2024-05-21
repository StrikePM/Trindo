import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { transactionFetch } from "../../slices/sliceTransaction";

export default function TransactionsList() {
    const dispatch = useDispatch();

    const { stateTransaction, stateRefreshTrans } = useSelector((state) => state.transaction); //deklarasi state yang diambil dari sliceRransaction.js
    const navigate = useNavigate();
    console.log(stateTransaction);
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    useEffect(() => {
        dispatch(transactionFetch());
    }, [stateRefreshTrans]);

    // mengeluarkan isi data dari dalam state produk
    const rows =
        stateTransaction &&
        stateTransaction.map((item) => {
            return {
                id: item.transaction_id,
                pName: item.product_name,
                tQty: item.transaction_qty,
                tPrice: item.transaction_price.toLocaleString(),
                tTotal: item.transaction_total.toLocaleString(),
                tDate: formatDate(item.transaction_date),
                tStatus: item.transaction_status,
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]
    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : [];

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "pName", headerName: "Nama Produk", width: 120 },
        { field: "tQty", headerName: "Qty Transaksi", width: 120 },
        { field: "tPrice", headerName: "Unit Price (Rp.)", width: 120 },
        { field: "tTotal", headerName: "Total Price (Rp.)", width: 120 },
        { field: "tDate", headerName: "Tanggal Transaksi", width: 140 },
        { field: "tStatus", headerName: "Status Transaksi", width: 140 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const rId = params.row.id;
                return (
                    <div className="m-2">
                        <button onClick={() => navigate(`edit-transaction/${rId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                        <button onClick={() => navigate(`delete-transaction/${rId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Transaction List</h1>
            <button onClick={() => navigate(`create-transaction`)} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 rounded my-[10px]" >
                Create New Transaction
            </button>
            <DataGrid
                rows={validRows}
                columns={columns}
                autoPageSize={true}
                rowsPerPageOptions={[5]}
                getRowHeight={() => 'auto'}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}