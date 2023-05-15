import { configureStore } from '@reduxjs/toolkit';
import dishesReducer from 'features/dishes/dishesSlice';

export const store = configureStore({
    reducer: {
        dishes: dishesReducer,
    },
});
