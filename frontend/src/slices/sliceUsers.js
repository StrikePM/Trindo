import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateUsers: [],
    stateRefreshUsers: 0,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
    errorMessage: null,
};

//fetch user
export const usersFetch = createAsyncThunk(
    "users/usersFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/users`);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
);

//create user
export const usersCreate = createAsyncThunk(
    "users/usersCreate",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${url}/users`,
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
export const usersEdit = createAsyncThunk(
    "users/usersEdit",
    async (values) => {
        try {
            const response = await axios.patch(
                `${url}/users/${values.user.userId}`,
                values.user,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//delete user
export const usersDelete = createAsyncThunk(
    "users/usersDelete",
    async (userId) => {
        try {
            const response = await axios.delete(
                `${url}/users/${userId}`,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const profileEdit = createAsyncThunk(
    "users/profileEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/profile`,
                values,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceUsers = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(usersFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(usersFetch.fulfilled, (state, action) => {
                state.stateUsers = action.payload;
                state.status = "success";
            })
            .addCase(usersFetch.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(usersCreate.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(usersCreate.fulfilled, (state, action) => {
                state.createStatus = "success";
                state.stateRefreshUsers = Math.random();
                toast.success(`Register Berhasil`, {
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
            .addCase(usersCreate.rejected, (state, action) => {
                state.status = "rejected";
                state.errorMessage = action.payload;
                toast.error(`Register Gagal: ${action.payload}`, {
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
            .addCase(usersEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(usersEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedUser = state.stateUsers.map((user) =>
                        user.user_id === action.payload.user_id ? action.payload : user
                    );
                    state.stateUsers = updatedUser;
                    state.editStatus = "success";
                    state.stateRefreshUsers = Math.random();
                    toast.info("User telah diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("User gagal diedit!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(usersEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            })
            .addCase(usersDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
            })
            .addCase(usersDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    const newList = state.stateUsers.filter(
                        (item) => item.user_id !== action.payload.user_id
                    );
                    state.stateUsers = newList;
                    state.deleteStatus = "success";
                    state.stateRefreshUsers = Math.random();
                    toast.success("User telah dihapus!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("User gagal dihapus!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(usersDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                toast.error(`User gagal dihapus: ${action.error.message}`, {
                    position: "bottom-left",
                });
            })
            .addCase(profileEdit.pending, (state, action) => {
                state.editStatus = "pending";
            })
            .addCase(profileEdit.fulfilled, (state, action) => {
                if (action.payload) {
                    const updatedUser = state.stateUsers.map((user) =>
                        user.user_id === action.payload.user_id ? action.payload : user
                    );
                    state.stateUsers = updatedUser;
                    state.editStatus = "success";
                    state.stateRefreshUsers = Math.random();
                    toast.info("User telah diedit!", {
                        position: "bottom-left",
                    });
                } else {
                    toast.error("User gagal diedit!", {
                        position: "bottom-left",
                    });
                }
            })
            .addCase(profileEdit.rejected, (state, action) => {
                state.editStatus = "rejected";
            });
    },
});

export default sliceUsers.reducer;