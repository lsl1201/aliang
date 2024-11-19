import { createSlice } from '@reduxjs/toolkit'


const statusStore = createSlice({
    name: 'status',
    initialState: {
        active: "/"
    },
    reducers: {
        setActiveFn: (state, action) => {
            state.active = action.payload
        }
    }
})

export const { setActiveFn } = statusStore.actions

const reducers =  statusStore.reducer

export default reducers
