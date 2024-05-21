import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersFetch } from "../../slices/sliceUsers";

export default function UsersList() {
    const dispatch = useDispatch();

    const { stateUsers, stateRefreshUsers } = useSelector((state) => state.users); //deklarasi state yang diambil dari sliceUsers.js
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(usersFetch());
    }, [stateRefreshUsers]);

    // mengeluarkan isi data dari dalam state produk
    const rows =
        stateUsers &&
        stateUsers.map((item) => {
            return {
                id: item.user_id,
                uName: item.user_name,
                uAddress: item.user_address,
                uEmail: item.user_email,
                uPhone: item.user_phone,
                uRole: item.user_role,
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]
    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : [];

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "uName", headerName: "Nama User", width: 100 },
        { field: "uAddress", headerName: "Alamat Produk", width: 120 },
        { field: "uEmail", headerName: "Email User", width: 150 },
        { field: "uPhone", headerName: "Nohp User", width: 120 },
        { field: "uRole", headerName: "Role User", width: 120 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const uId = params.row.id;
                return (
                    <div className="m-2">
                        <button onClick={() => navigate(`edit-users/${uId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                        <button onClick={() => navigate(`delete-users/${uId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl mb-[20px]">User List</h1>
            
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