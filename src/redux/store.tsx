import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './slice/modal'
import { AuthApi, UserApi, WalletApi, AgentApi } from './api'
import dataSlice from './slice/data'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    data: dataSlice,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [WalletApi.reducerPath]: WalletApi.reducer,
    [AgentApi.reducerPath]: AgentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    AuthApi.middleware, 
    UserApi.middleware,
    WalletApi.middleware,
    AgentApi.middleware
  ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
