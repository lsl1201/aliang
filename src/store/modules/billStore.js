import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
    name: 'bill',
    initialState: {
        active:"1"
    },
    reducers: {
        setBillList: (state, action) => {
            state.billList=action.payload
        }
    }
})

export const { setBillList } = billStore.actions
// 异步代码
// export const getBillList = () => {
//     return async (dispatch) => {
//         const res = await axios.get('http://localhost:8888/ka')
//         dispatch(setBillList(res.data))
//     }
// }

const reducers =  billStore.reducer

export default reducers
