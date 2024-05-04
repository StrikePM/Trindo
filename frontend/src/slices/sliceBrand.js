import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateBrand: [],
    stateRefreshBrand: null,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//fetch user
export const brandFetch = createAsyncThunk(
    "brand/brandFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/brand`);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
);

//create user
export const brandCreate = createAsyncThunk(
    "brand/brandCreate",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${url}/brand`,
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
export const brandEdit = createAsyncThunk(
    "brand/brandEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/brand/${values.brand.brandId}`,
                values.brand,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//delete user
export const brandDelete = createAsyncThunk(
    "brand/brandDelete",
    async (brandId) => {
        try {
            const response = await axios.delete(
                `${url}/brand/${brandId}`,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceCategories = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(brandFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(brandFetch.fulfilled, (state, action) => {
                state.stateBrand = action.payload;
                state.status = "success";
            })
            .addCase(brandFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(brandCreate.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(brandCreate.fulfilled, (state, action) => {
                state.createStatus = "success";
                state.stateRefreshBrand = Math.random();
                toast.success(`Berhasil membuat brand`, {
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
            .addCase(brandCreate.rejected, (state, action) => {
                state.status = "rejected";
                state.errorMessage = action.payload;
                toast.error(`Gagal membuat brand: ${action.payload}`, {
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
            .addCase(brandEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(brandEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedBrand = state.stateBrand.map((brand) =>
                        brand.brand_id === action.payload.brand_id ? action.payload : brand
                    );
                    state.stateBrand = updatedBrand;
                    state.editStatus = "success";
                    state.stateRefreshBrand = Math.random();
                    toast.info("Brand Telah Diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Brand Masih Digunakan!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(brandEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            })
            .addCase(brandDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
            })
            .addCase(brandDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    const newList = state.stateBrand.filter(
                        (item) => item.brand_id !== action.payload.brand_id
                    );
                    state.stateBrand = newList;
                    state.deleteStatus = "success";
                    state.stateRefreshBrand = Math.random();
                    toast.success("Brand Telah Dihapus!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Brand Masih Digunakan!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(brandDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
            });
    },
});

export default sliceCategories.reducer;