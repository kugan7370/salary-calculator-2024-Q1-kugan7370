import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Deduction {
    id: number;
    title: string;
    amount: string;
}

const initialState: Deduction[] = [
    { id: 1, title: "No Pay", amount: "8,000.00" },
];

const deductionsSlice = createSlice({
    name: "deductions",
    initialState,
    reducers: {
        addDeduction: (state) => {
            const newId = state.length ? state[state.length - 1].id + 1 : 1;
            state.push({ id: newId, title: "", amount: "0" });
        },
        removeDeduction: (state, action: PayloadAction<number>) => {
            return state.filter((deduction) => deduction.id !== action.payload);
        },
        updateDeduction: (
            state,
            action: PayloadAction<{ id: number; key: string; value: string }>
        ) => {
            const deduction = state.find(
                (deduction) => deduction.id === action.payload.id
            );
            if (deduction) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (deduction as any)[action.payload.key] = action.payload.value;
            }
        },
        resetDeducations: () => {
            return initialState;
        }
    },
});

export const { addDeduction, removeDeduction, updateDeduction,resetDeducations } =
    deductionsSlice.actions;
export default deductionsSlice.reducer;
