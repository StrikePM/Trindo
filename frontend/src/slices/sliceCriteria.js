import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateCriteria: [],
    stateRefreshCriteria: null,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//fetch user
export const criteriaFetch = createAsyncThunk(
    "criteria/criteriaFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/criteria`);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceCriteria = createSlice({
    name: "criteria",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(criteriaFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(criteriaFetch.fulfilled, (state, action) => {
                state.stateCriteria = action.payload;
                state.stateRefreshCriteria = Math.random();
                state.status = "success";
            })
            .addCase(criteriaFetch.rejected, (state, action) => {
                state.status = "rejected";
            });
    },
});

export default sliceCriteria.reducer;