import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateResupply: [],
    stateRefreshRes: null,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//fetch user
export const resupplyFetch = createAsyncThunk(
    "resupply/resupplyFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/resupply`);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
);

//create user
export const resupplyCreate = createAsyncThunk(
    "resupply/resupplyCreate",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${url}/resupply`,
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
export const resupplyEdit = createAsyncThunk(
    "resupply/resupplyEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/resupply/${values.resupply.resupplyId}`,
                values.resupply,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//delete user
export const resupplyDelete = createAsyncThunk(
    "resupply/resupplyDelete",
    async (resupplyId) => {
        try {
            const response = await axios.delete(
                `${url}/resupply/${resupplyId}`,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceCategories = createSlice({
    name: "resupply",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(resupplyFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(resupplyFetch.fulfilled, (state, action) => {
                state.stateResupply = action.payload;
                state.status = "success";
            })
            .addCase(resupplyFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(resupplyCreate.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(resupplyCreate.fulfilled, (state, action) => {
                state.createStatus = "success";
                state.stateRefreshRes = Math.random();
                toast.success(`Berhasil membuat resupply`, {
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
            .addCase(resupplyCreate.rejected, (state, action) => {
                state.status = "rejected";
                state.errorMessage = action.payload;
                toast.error(`Gagal membuat resupply: ${action.payload}`, {
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
            .addCase(resupplyEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(resupplyEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedResupply = state.stateResupply.map((resupply) =>
                        resupply.resupply_id === action.payload.resupply_id ? action.payload : resupply
                    );
                    console.log(updatedResupply);
                    state.stateResupply = updatedResupply;
                    state.editStatus = "success";
                    state.stateRefreshRes = Math.random();
                    toast.info("Resupply Telah Diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Resupply Masih Digunakan!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(resupplyEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            })
            .addCase(resupplyDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
            })
            .addCase(resupplyDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    const newList = state.stateResupply.filter(
                        (item) => item.resupply_id !== action.payload.resupply_id
                    );
                    state.stateResupply = newList;
                    state.deleteStatus = "success";
                    state.stateRefreshRes = Math.random();
                    toast.success("Resupply Telah Dihapus!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Resupply Masih Digunakan!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(resupplyDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
            });
    },
});

export default sliceCategories.reducer;