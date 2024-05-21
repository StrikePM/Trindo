import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateRankGrinder: [],
    stateRefreshRankGrinder: null,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//fetch user
export const rankGrinderFetch = createAsyncThunk(
    "rankGrinder/rankGrinderFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/rankGrinder`);
            console.log(response);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
);

//create user
export const rankGrinderCreate = createAsyncThunk(
    "rankGrinder/rankGrinderCreate",
    async (values, { rejectWithValue }) => {
        try {
            console.log(values);
            const response = await axios.post(
                `${url}/rankGrinder`,
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
export const rankGrinderEdit = createAsyncThunk(
    "rankGrinder/rankGrinderEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/rankGrinder/${values.rankGrinder.rankGrinderId}`,
                values.category,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//delete user
export const rankGrinderDelete = createAsyncThunk(
    "rankGrinder/rankGrinderDelete",
    async () => {
        try {
            const response = await axios.delete(
                `${url}/rankGrinder`,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceRankGrinder = createSlice({
    name: "rankGrinder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(rankGrinderFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(rankGrinderFetch.fulfilled, (state, action) => {
                state.stateRankGrinder = action.payload;
                state.status = "success";
            })
            .addCase(rankGrinderFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(rankGrinderCreate.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(rankGrinderCreate.fulfilled, (state, action) => {
                state.createStatus = "success";
                state.stateRefreshRankGrinder = Math.random();
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
            .addCase(rankGrinderCreate.rejected, (state, action) => {
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
            .addCase(rankGrinderEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(rankGrinderEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedRankGrinder = state.stateRankGrinder.map((rankGrinder) =>
                        rankGrinder.alternatif_id === action.payload.alternatif_id ? action.payload : rankGrinder
                    );
                    state.stateRankGrinder = updatedRankGrinder;
                    state.editStatus = "success";
                    state.stateRefreshRankGrinder = Math.random();
                    toast.info("Kategori telah diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Kategori gagal diedit!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(rankGrinderEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            })
            .addCase(rankGrinderDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
            })
            .addCase(rankGrinderDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    const newList = state.stateRankGrinder.filter(
                        (item) => item.alternatif_id !== action.payload.alternatif_id
                    );
                    state.stateRankGrinder = newList;
                    state.deleteStatus = "success";
                    state.stateRefreshRankGrinder = Math.random();
                    toast.success("Kategori telah dihapus!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error(`Kategori gagal dihapus`, {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(rankGrinderDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                toast.error(`Kategori gagal dihapus: ${action.error.message}`, {
                    position: "bottom-left",
                });
            });
    },
});

export default sliceRankGrinder.reducer;