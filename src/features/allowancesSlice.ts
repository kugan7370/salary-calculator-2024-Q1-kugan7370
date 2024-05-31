import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Allowance {
    id: number;
    title: string;
    amount: string;
    epf: boolean;
}

const initialState: Allowance[] = [
    { id: 1, title: 'Travel', amount: '10,000.00', epf: false }
];

const allowancesSlice = createSlice({
    name: 'allowances',
    initialState,
    reducers: {
        addAllowance: (state) => {
            const newId = state.length ? state[state.length - 1].id + 1 : 1;
            state.push({ id: newId, title: '', amount: '', epf: false });
        },
        removeAllowance: (state, action: PayloadAction<number>) => {
            return state.filter(allowance => allowance.id !== action.payload);
        },
        updateAllowance: (state, action: PayloadAction<{ id: number, key: string, value: string | boolean }>) => {
            const allowance = state.find(allowance => allowance.id === action.payload.id);
            if (allowance) {

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (allowance as any)[action.payload.key] = action.payload.value;
            }
        },
        resetAllowances: () => {
            return initialState;
        }
    }
});

export const { addAllowance, removeAllowance, updateAllowance,resetAllowances } = allowancesSlice.actions;
export default allowancesSlice.reducer;
