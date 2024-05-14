import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateMiatkWrench: [],
    stateRefreshMiatkWrench: null,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//fetch user
export const miatkWrenchFetch = createAsyncThunk(
    "miatkWrench/miatkWrenchFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/miatkWrench`);
            console.log(response);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
);

//create user
export const miatkWrenchCreate = createAsyncThunk(
    "miatkWrench/miatkWrenchCreate",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${url}/miatkWrench`,
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
export const miatkWrenchEdit = createAsyncThunk(
    "miatkWrench/miatkWrenchEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/miatkWrench/${values.miatkWrench.miatkWrenchId}`,
                values.category,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//delete user
export const miatkWrenchDelete = createAsyncThunk(
    "miatkWrench/miatkWrenchDelete",
    async () => {
        try {
            const response = await axios.delete(
                `${url}/miatkWrench`,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceMiatkWrench = createSlice({
    name: "miatkWrench",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(miatkWrenchFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(miatkWrenchFetch.fulfilled, (state, action) => {
                state.stateMiatkWrench = action.payload;
                state.status = "success";
            })
            .addCase(miatkWrenchFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(miatkWrenchCreate.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(miatkWrenchCreate.fulfilled, (state, action) => {
                state.createStatus = "success";
                state.stateRefreshMiatkWrench = Math.random();
                toast.success(`Berhasil membuat kategori`, {
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
            .addCase(miatkWrenchCreate.rejected, (state, action) => {
                state.status = "rejected";
                state.errorMessage = action.payload;
                toast.error(`Gagal membuat kategori: ${action.payload}`, {
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
            .addCase(miatkWrenchEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(miatkWrenchEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedMiatkWrench = state.stateMiatkWrench.map((miatkWrench) =>
                        miatkWrench.alternatif_id === action.payload.alternatif_id ? action.payload : miatkWrench
                    );
                    state.stateMiatkWrench = updatedMiatkWrench;
                    state.editStatus = "success";
                    state.stateRefreshMiatkWrench = Math.random();
                    toast.info("Kategori telah diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Kategori gagal diedit!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(miatkWrenchEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            })
            .addCase(miatkWrenchDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
            })
            .addCase(miatkWrenchDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    const newList = state.stateMiatkWrench.filter(
                        (item) => item.alternatif_id !== action.payload.alternatif_id
                    );
                    state.stateMiatkWrench = newList;
                    state.deleteStatus = "success";
                    state.stateRefreshMiatkWrench = Math.random();
                    toast.success("Kategori telah dihapus!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error(`Kategori gagal dihapus`, {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(miatkWrenchDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                toast.error(`Kategori gagal dihapus: ${action.error.message}`, {
                    position: "bottom-left",
                });
            });
    },
});

export default sliceMiatkWrench.reducer;