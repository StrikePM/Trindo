import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateAuth: [],
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//create session
export const sessionCreate = createAsyncThunk(
    "session/sessionCreate",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${url}/login`,
                values,
            );

            return response.data;
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.msg;
                return rejectWithValue(errorMessage);
            }
            throw error;
        }
    }
);

//fetch me
export const meFetch = createAsyncThunk(
    "session/meFetch",
    async () => {
        try {
            // const response = await axios.get('http://localhost:5000/api/me');
            // return response.data;
            const response = await axios.get(`${url}/me`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//delete session
export const sessionDelete = createAsyncThunk(
    "session/sessionDelete",
    async () => {
        try {
            const response = await axios.delete(
                `${url}/logout`
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceAuth = createSlice({
    name: "session",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sessionCreate.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(sessionCreate.fulfilled, (state, action) => {
                state.createStatus = "success";
                state.stateAuth = action.payload;
                toast.success(`Selamat Datang: ${state.stateAuth.nameUser}`, {
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
            .addCase(sessionCreate.rejected, (state, action) => {
                state.status = "rejected";
                state.errorMessage = action.payload;
                toast.error(`Error: ${action.payload}`, {
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
            .addCase(meFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(meFetch.fulfilled, (state, action) => {
                state.stateAuth = action.payload;
                // console.log(state.stateAuth);
                state.status = "success";
            })
            .addCase(meFetch.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
            .addCase(sessionDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
            })
            .addCase(sessionDelete.fulfilled, (state, action) => {
                state.deleteStatus = "success";
                toast.success(`Selamat Tinggal: ${state.stateAuth.user_name}`, {
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
            .addCase(sessionDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
            });
    },
});

export default sliceAuth.reducer;