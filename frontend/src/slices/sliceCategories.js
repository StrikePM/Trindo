import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateCategories: [],
    stateRefreshCategories: 0,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//fetch user
export const categoriesFetch = createAsyncThunk(
    "categories/categoriesFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/categories`);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
);

//create user
export const categoriesCreate = createAsyncThunk(
    "categories/categoriesCreate",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${url}/categories`,
                values,
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.msg;
                console.log(errorMessage);
                return rejectWithValue(errorMessage);
            }
            throw error;
        }
    }
);

//edit user
export const categoriesEdit = createAsyncThunk(
    "categories/categoriesEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/categories/${values.category.categoryId}`,
                values.category,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//delete user
export const categoriesDelete = createAsyncThunk(
    "categories/categoriesDelete",
    async (userId) => {
        try {
            const response = await axios.delete(
                `${url}/categories/${categoryId}`,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceCategories = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(categoriesFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(categoriesFetch.fulfilled, (state, action) => {
                state.stateCategories = action.payload;
                state.status = "success";
            })
            .addCase(categoriesFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(categoriesCreate.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(categoriesCreate.fulfilled, (state, action) => {
                state.stateCategories = action.payload;
                state.createStatus = "success";
                state.stateRefreshCategories = Math.random();
                toast.success(`Register Berhasil`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .addCase(categoriesCreate.rejected, (state, action) => {
                state.status = "rejected";
                state.errorMessage = action.payload;
                toast.error(`Register Gagal: ${action.payload}`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .addCase(categoriesEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(categoriesEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedUser = state.stateCategories.map((category) =>
                        category.category_id === action.payload.category_id ? action.payload : category
                    );
                    state.stateCategories = updatedUser;
                    state.editStatus = "success";
                    state.stateRefreshCategories = Math.random();
                    toast.info("Category Telah Diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Category Masih Digunakan!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(categoriesEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            })
            .addCase(categoriesDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
            })
            .addCase(categoriesDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    const newList = state.stateCategories.filter(
                        (item) => item.category_id !== action.payload.category_id
                    );
                    state.stateCategories = newList;
                    state.deleteStatus = "success";
                    state.stateRefreshCategories = Math.random();
                    toast.success("Category Telah Dihapus!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Category Masih Digunakan!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(categoriesDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
            });
    },
});

export default sliceCategories.reducer;