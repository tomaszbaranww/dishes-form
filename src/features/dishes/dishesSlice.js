import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    dishes: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
};

export const addNewDish = createAsyncThunk('dishes/addNewDish', async (initialDish) => {
    const response = await axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', initialDish);
    return response.data;
});

const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        dishAdded: {
            reducer(state, action) {
                state.dishes.push(action.payload);
            },
            prepare() {
                return {
                    payload: {
                        id: nanoid(),
                    },
                };
            },
        },
    },
    extraReducers(builder) {
        builder
            .addCase(addNewDish.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(addNewDish.fulfilled, (state, action) => {
                state.status = 'succeeded';
                action.payload.id = state.dishes.length ? state.dishes[state.dishes.length - 1].id + 1 : 1;
                state.dishes.push(action.payload);
                state.message = 'Dish successfully added!';
            })

            .addCase(addNewDish.rejected, (state, action) => {
                state.status = 'failed';
                state.message = action.error.message;
            });
    },
});
export const getDishesStatus = (state) => state.dishes.status;

export const getDishesMessage = (state) => state.dishes.message;

export default dishesSlice.reducer;
