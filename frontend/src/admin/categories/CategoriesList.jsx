import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productsFetch } from "../../slices/sliceProducts";
import { categoriesFetch } from "../../slices/sliceCategories";

export default function CategoriesList() {
    const dispatch = useDispatch();

    // dispatch(productsFetch());

    const { stateCategories, stateRefreshCategories } = useSelector((state) => state.categories); //deklarasi state yang diambil dari sliceProducts.js
    // const { stateRefreshProd } = useSelector((state) => state.products); //deklarasi state yang diambil dari sliceProducts.js
    const navigate = useNavigate();
    // const route = useIs
    console.log(stateCategories);
    useEffect(()=>{
        dispatch(categoriesFetch());
    }, [stateRefreshCategories]);
    
    // mengeluarkan isi data dari dalam state produk
    const rows =
        stateCategories &&
        stateCategories.map((item) => {
            return {
                id: item.category_id,
                catName: item.category_name,
                catDesc: item.category_desc,
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]
    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : [];

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "catName", headerName: "Nama Kategori", width: 120 },
        { field: "catDesc", headerName: "Deskripsi", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const cId = params.row.id;
                return (
                    <div className="m-2">
                        <button onClick={() => navigate(`edit-category/${cId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                        <button onClick={() => navigate(`delete-category/${cId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Category List</h1>
            <button onClick={() => navigate(`create-category`)} className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 rounded my-[10px]" >
                Create New Category
            </button>
            <DataGrid
                rows={validRows}
                columns={columns}
                autoPageSize={true}
                rowsPerPageOptions={[5]}
                getRowHeight={()=> 'auto'}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}