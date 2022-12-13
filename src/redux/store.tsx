import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './slice/modal'
import { AuthApi, UserApi, WalletApi } from './api'
import dataSlice from './slice/data'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    data: dataSlice,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [WalletApi.reducerPath]: WalletApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    AuthApi.middleware, 
    UserApi.middleware,
    WalletApi.middleware,
  ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
