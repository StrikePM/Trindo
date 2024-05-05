import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resupplyFetch } from "../../slices/sliceResupply";

export default function ResupplyList() {
    const dispatch = useDispatch();

    const { stateResupply, stateRefreshRes } = useSelector((state) => state.resupply); //deklarasi state yang diambil dari sliceResupply.js
    const navigate = useNavigate();
    
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
        dispatch(resupplyFetch());
    }, [stateRefreshRes]);

    // mengeluarkan isi data dari dalam state produk
    const rows =
        stateResupply &&
        stateResupply.map((item) => {
            return {
                id: item.resupply_id,
                pName: item.product_name,
                resStock: item.resupply_stock,
                resPrice: item.resupply_price,
                resTotal: item.resupply_total,
                resDate: formatDate(item.resupply_date),
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]
    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : [];

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "pName", headerName: "Nama Produk", width: 120 },
        { field: "resStock", headerName: "Stok Resupply", width: 120 },
        { field: "resPrice", headerName: "Unit Price", width: 120 },
        { field: "resTotal", headerName: "Total Price", width: 120 },
        { field: "resDate", headerName: "Tanggal Resupply", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const rId = params.row.id;
                return (
                    <div className="m-2">
                        <button onClick={() => navigate(`edit-resupply/${rId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                        <button onClick={() => navigate(`delete-resupply/${rId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Products List</h1>
            <button onClick={() => navigate(`create-resupply`)} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 rounded my-[10px]" >
                Create New Resupply
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