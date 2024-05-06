import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateTransaction: [],
    stateRefreshTrans: null,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//fetch user
export const transactionFetch = createAsyncThunk(
    "transaction/transactionFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/transaction`);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
);

//create user
export const transactionCreate = createAsyncThunk(
    "transaction/transactionCreate",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${url}/transaction`,
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
export const transactionEdit = createAsyncThunk(
    "transaction/transactionEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/transaction/${values.transaction.transactionId}`,
                values.transaction,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//delete user
export const transactionDelete = createAsyncThunk(
    "transaction/transactionDelete",
    async (transactionId) => {
        try {
            const response = await axios.delete(
                `${url}/transaction/${transactionId}`,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceCategories = createSlice({
    name: "transaction",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(transactionFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(transactionFetch.fulfilled, (state, action) => {
                state.stateTransaction = action.payload;
                state.status = "success";
            })
            .addCase(transactionFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(transactionCreate.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(transactionCreate.fulfilled, (state, action) => {
                state.createStatus = "success";
                state.stateRefreshTrans = Math.random();
                toast.success(`Berhasil membuat transaction`, {
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
            .addCase(transactionCreate.rejected, (state, action) => {
                state.status = "rejected";
                state.errorMessage = action.payload;
                toast.error(`Gagal membuat transaction: ${action.payload}`, {
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
            .addCase(transactionEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(transactionEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedTransaction = state.stateTransaction.map((transaction) =>
                        transaction.transaction_id === action.payload.transaction_id ? action.payload : transaction
                    );
                    console.log(updatedTransaction);
                    state.stateTransaction = updatedTransaction;
                    state.editStatus = "success";
                    state.stateRefreshTrans = Math.random();
                    toast.info("Transaction telah diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Transaction gagal diedit!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(transactionEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            })
            .addCase(transactionDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
            })
            .addCase(transactionDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    const newList = state.stateTransaction.filter(
                        (item) => item.transaction_id !== action.payload.transaction_id
                    );
                    state.stateTransaction = newList;
                    state.deleteStatus = "success";
                    state.stateRefreshTrans = Math.random();
                    toast.success("Transaction telah dihapus!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("Transaction gagal dihapus!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(transactionDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
            });
    },
});

export default sliceCategories.reducer;