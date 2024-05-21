import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateRankDrill: [],
    stateRefreshRankDrill: null,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//fetch user
export const rankDrillFetch = createAsyncThunk(
    "rankDrill/rankDrillFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/rankDrill`);
            console.log(response);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
);

//create user
export const rankDrillCreate = createAsyncThunk(
    "rankDrill/rankDrillCreate",
    async (values, { rejectWithValue }) => {
        try {
            console.log(values);
            const response = await axios.post(
                `${url}/rankDrill`,
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
export const rankDrillEdit = createAsyncThunk(
    "rankDrill/rankDrillEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/rankDrill/${values.rankDrill.rankDrillId}`,
                values.category,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//delete user
export const rankDrillDelete = createAsyncThunk(
    "rankDrill/rankDrillDelete",
    async () => {
        try {
            const response = await axios.delete(
                `${url}/rankDrill`,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceRankDrill = createSlice({
    name: "rankDrill",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(rankDrillFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(rankDrillFetch.fulfilled, (state, action) => {
                state.stateRankDrill = action.payload;
                state.status = "success";
            })
            .addCase(rankDrillFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(rankDrillCreate.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(rankDrillCreate.fulfilled, (state, action) => {
                state.createStatus = "success";
                state.stateRefreshRankDrill = Math.random();
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
            .addCase(rankDrillCreate.rejected, (state, action) => {
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
            .addCase(rankDrillEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(rankDrillEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedRankDrill = state.stateRankDrill.map((rankDrill) =>
                        rankDrill.alternatif_id === action.payload.alternatif_id ? action.payload : rankDrill
                    );
                    state.stateRankDrill = updatedRankDrill;
                    state.editStatus = "success";
                    state.stateRefreshRankDrill = Math.random();
                    toast.info("Kategori telah diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Kategori gagal diedit!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(rankDrillEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            })
            .addCase(rankDrillDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
            })
            .addCase(rankDrillDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    const newList = state.stateRankDrill.filter(
                        (item) => item.alternatif_id !== action.payload.alternatif_id
                    );
                    state.stateRankDrill = newList;
                    state.deleteStatus = "success";
                    state.stateRefreshRankDrill = Math.random();
                    toast.success("Kategori telah dihapus!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error(`Kategori gagal dihapus`, {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(rankDrillDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                toast.error(`Kategori gagal dihapus: ${action.error.message}`, {
                    position: "bottom-left",
                });
            });
    },
});

export default sliceRankDrill.reducer;