import { configureStore } from '@reduxjs/toolkit'
import billReducer from './modules/billStore'
import statusReducer from './modules/status'
import userReducer from './modules/user'

const store = configureStore({
  reducer: {
    bill: billReducer,
    status: statusReducer,
    user: userReducer
  }
})

export default store