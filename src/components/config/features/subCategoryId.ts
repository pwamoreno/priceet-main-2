import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface subCategoryIdStateProps {
    data?: string;
}

const initialState: subCategoryIdStateProps = {
    data: '',

};

export const subCategoryIdState = createSlice({
    name: "subCategoryIdStateType",
    initialState,
    reducers: {
        setSubCategoryIdState: (state, action: PayloadAction<subCategoryIdStateProps>) => {
            state.data = action?.payload?.data;
        }
    }
});

export const { setSubCategoryIdState } = subCategoryIdState.actions;

export default subCategoryIdState.reducer;