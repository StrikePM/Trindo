import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { brandFetch } from "../../slices/sliceBrand";

export default function BrandList() {
    const dispatch = useDispatch();

    // dispatch(productsFetch());

    const { stateBrand, stateRefreshBrand } = useSelector((state) => state.brand); //deklarasi state yang diambil dari sliceProducts.js
    // const { stateRefreshProd } = useSelector((state) => state.products); //deklarasi state yang diambil dari sliceProducts.js
    const navigate = useNavigate();
    // const route = useIs
    console.log(stateBrand);
    useEffect(()=>{
        dispatch(brandFetch());
    }, [stateRefreshBrand]);
    
    // mengeluarkan isi data dari dalam state produk
    const rows =
        stateBrand &&
        stateBrand.map((item) => {
            return {
                id: item.brand_id,
                brName: item.brand_name,
                brDesc: item.brand_desc,
            };
        }); 
    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : [];

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "brName", headerName: "Nama Brand", width: 120 },
        { field: "brDesc", headerName: "Deskripsi", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const bId = params.row.id;
                return (
                    <div className="m-2">
                        <button onClick={() => navigate(`edit-brand/${bId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                        <button onClick={() => navigate(`delete-brand/${bId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Brand List</h1>
            <button onClick={() => navigate(`create-brand`)} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 rounded my-[10px]" >
                Create New Brand
            </button>
            <DataGrid
                rows={validRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowHeight={()=> 'auto'}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}