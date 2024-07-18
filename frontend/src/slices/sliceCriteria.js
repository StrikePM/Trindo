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

export const criteriaEdit = createAsyncThunk(
    "criteria/criteriaEdit",
    async (values) => {
        try {
            console.log(values);
            const response = await axios.put(
                `${url}/criteria/${values.criteria.criteriaId}`,
                values.criteria,
            );

            return response.data;
        } catch (error) {
            console.log(error);
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
                state.status = "success";
            })
            .addCase(criteriaFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(criteriaEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(criteriaEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedCriteria = state.stateCriteria.map((criteria) =>
                        criteria.criteria_id === action.payload.criteria_id ? action.payload : criteria
                    );
                    state.stateCriteria = updatedCriteria;
                    state.editStatus = "success";
                    state.stateRefreshCriteria = Math.random();
                    toast.info("Kriteria telah diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Kriteria gagal diedit!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(criteriaEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            });
    },
});

export default sliceCriteria.reducer;