import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { criteriaFetch } from "../../slices/sliceCriteria";

export default function CriteriaList() {
    const dispatch = useDispatch();

    const { stateCriteria, stateRefreshCriteria } = useSelector((state) => state.criteria); //deklarasi state yang diambil dari sliceProducts.js
    // const { stateRefreshProd } = useSelector((state) => state.products); //deklarasi state yang diambil dari sliceProducts.js
    const navigate = useNavigate();
    // const route = useIs
    console.log(stateCriteria);
    useEffect(() => {
        dispatch(criteriaFetch());
    }, [stateRefreshCriteria]);

    // mengeluarkan isi data dari dalam state produk
    const rows =
        stateCriteria &&
        stateCriteria.map((item) => {
            return {
                id: item.criteria_id,
                criName: item.criteria_name,
                criStart1: item.sub_start_1,
                criEnd1: item.sub_end_1,
                criWeight1: item.sub_weight_1,
                criStart2: item.sub_start_2,
                criEnd2: item.sub_end_2,
                criWeight2: item.sub_weight_2,
                criStart3: item.sub_start_3,
                criEnd3: item.sub_end_3,
                criWeight3: item.sub_weight_3,
                criStart4: item.sub_start_4,
                criEnd4: item.sub_end_4,
                criWeight4: item.sub_weight_4,
                criStart5: item.sub_start_5,
                criEnd5: item.sub_end_5,
                criWeight5: item.sub_weight_5,
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]
    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : [];

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "criName", headerName: "Nama Kriteria", width: 120 },
        { field: "criStart1", headerName: "Batas Awal 1", width: 120 },
        { field: "criEnd1", headerName: "Batas Akhir 1", width: 120 },
        { field: "criWeight1", headerName: "Bobot 1", width: 120 },
        { field: "criStart2", headerName: "Batas Awal 2", width: 120 },
        { field: "criEnd2", headerName: "Batas Akhir 2", width: 120 },
        { field: "criWeight2", headerName: "Bobot 2", width: 120 },
        { field: "criStart3", headerName: "Batas Awal 3", width: 120 },
        { field: "criEnd3", headerName: "Batas Akhir 3", width: 120 },
        { field: "criWeight3", headerName: "Bobot 3", width: 120 },
        { field: "criStart4", headerName: "Batas Awal 4", width: 120 },
        { field: "criEnd4", headerName: "Batas Akhir 4", width: 120 },
        { field: "criWeight4", headerName: "Bobot 4", width: 120 },
        { field: "criStart5", headerName: "Batas Awal 5", width: 120 },
        { field: "criEnd5", headerName: "Batas Akhir 5", width: 120 },
        { field: "criWeight5", headerName: "Bobot 5", width: 120 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const cId = params.row.id;
                return (
                    <div className="m-2">
                        <button onClick={() => navigate(`edit-criteria/${cId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl mb-[20px]">Category List</h1>
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