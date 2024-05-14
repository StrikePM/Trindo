import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateRankWrench: [],
    stateRefreshRankWrench: null,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//fetch user
export const rankWrenchFetch = createAsyncThunk(
    "rankWrench/rankWrenchFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/rankWrench`);
            console.log(response);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
);

//create user
export const rankWrenchCreate = createAsyncThunk(
    "rankWrench/rankWrenchCreate",
    async (values, { rejectWithValue }) => {
        try {
            console.log(values);
            const response = await axios.post(
                `${url}/rankWrench`,
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
export const rankWrenchEdit = createAsyncThunk(
    "rankWrench/rankWrenchEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/rankWrench/${values.rankWrench.rankWrenchId}`,
                values.category,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//delete user
export const rankWrenchDelete = createAsyncThunk(
    "rankWrench/rankWrenchDelete",
    async () => {
        try {
            const response = await axios.delete(
                `${url}/rankWrench`,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceRankWrench = createSlice({
    name: "rankWrench",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(rankWrenchFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(rankWrenchFetch.fulfilled, (state, action) => {
                state.stateRankWrench = action.payload;
                state.status = "success";
            })
            .addCase(rankWrenchFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(rankWrenchCreate.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(rankWrenchCreate.fulfilled, (state, action) => {
                state.createStatus = "success";
                state.stateRefreshRankWrench = Math.random();
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
            .addCase(rankWrenchCreate.rejected, (state, action) => {
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
            .addCase(rankWrenchEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(rankWrenchEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedRankWrench = state.stateRankWrench.map((rankWrench) =>
                        rankWrench.alternatif_id === action.payload.alternatif_id ? action.payload : rankWrench
                    );
                    state.stateRankWrench = updatedRankWrench;
                    state.editStatus = "success";
                    state.stateRefreshRankWrench = Math.random();
                    toast.info("Kategori telah diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Kategori gagal diedit!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(rankWrenchEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            })
            .addCase(rankWrenchDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
            })
            .addCase(rankWrenchDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    const newList = state.stateRankWrench.filter(
                        (item) => item.alternatif_id !== action.payload.alternatif_id
                    );
                    state.stateRankWrench = newList;
                    state.deleteStatus = "success";
                    state.stateRefreshRankWrench = Math.random();
                    toast.success("Kategori telah dihapus!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error(`Kategori gagal dihapus`, {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(rankWrenchDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                toast.error(`Kategori gagal dihapus: ${action.error.message}`, {
                    position: "bottom-left",
                });
            });
    },
});

export default sliceRankWrench.reducer;