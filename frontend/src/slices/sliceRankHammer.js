import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateRankHammer: [],
    stateRefreshRankHammer: null,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//fetch user
export const rankHammerFetch = createAsyncThunk(
    "rankHammer/rankHammerFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/rankHammer`);
            console.log(response);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
);

//create user
export const rankHammerCreate = createAsyncThunk(
    "rankHammer/rankHammerCreate",
    async (values, { rejectWithValue }) => {
        try {
            console.log(values);
            const response = await axios.post(
                `${url}/rankHammer`,
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
export const rankHammerEdit = createAsyncThunk(
    "rankHammer/rankHammerEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/rankHammer/${values.rankHammer.rankHammerId}`,
                values.category,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//delete user
export const rankHammerDelete = createAsyncThunk(
    "rankHammer/rankHammerDelete",
    async () => {
        try {
            const response = await axios.delete(
                `${url}/rankHammer`,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceRankHammer = createSlice({
    name: "rankHammer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(rankHammerFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(rankHammerFetch.fulfilled, (state, action) => {
                state.stateRankHammer = action.payload;
                state.status = "success";
            })
            .addCase(rankHammerFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(rankHammerCreate.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(rankHammerCreate.fulfilled, (state, action) => {
                state.createStatus = "success";
                state.stateRefreshRankHammer = Math.random();
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
            .addCase(rankHammerCreate.rejected, (state, action) => {
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
            .addCase(rankHammerEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(rankHammerEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedRankHammer = state.stateRankHammer.map((rankHammer) =>
                        rankHammer.alternatif_id === action.payload.alternatif_id ? action.payload : rankHammer
                    );
                    state.stateRankHammer = updatedRankHammer;
                    state.editStatus = "success";
                    state.stateRefreshRankHammer = Math.random();
                    toast.info("Kategori telah diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Kategori gagal diedit!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(rankHammerEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            })
            .addCase(rankHammerDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
            })
            .addCase(rankHammerDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    const newList = state.stateRankHammer.filter(
                        (item) => item.alternatif_id !== action.payload.alternatif_id
                    );
                    state.stateRankHammer = newList;
                    state.deleteStatus = "success";
                    state.stateRefreshRankHammer = Math.random();
                    toast.success("Kategori telah dihapus!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error(`Kategori gagal dihapus`, {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(rankHammerDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                toast.error(`Kategori gagal dihapus: ${action.error.message}`, {
                    position: "bottom-left",
                });
            });
    },
});

export default sliceRankHammer.reducer;