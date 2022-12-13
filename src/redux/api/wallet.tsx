import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IResponse, ICreateAccountBody, IWithdraw, IFundWalletByCard, IFundWalletResponse, IBanks, IGetTransactionResponse, IWalletDetails, IUserTransacation, IPagination } from '../../interface'
import { FLEXIPAY_URL } from '../../utils/constants'
import { RootState } from '../store'


export const WalletApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: FLEXIPAY_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).data.token
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
          
            return headers
        }
    }),
    reducerPath: 'Wallet',
    tagTypes: ['User', 'Banks', 'Transaction', 'Wallet', 'UserTransaction'],
    endpoints: (build) => ({
        createAccount: build.mutation<IResponse<{data: null}>, ICreateAccountBody>({
            query: (body) => ({
                url: "/create/reserved/account",
                method: 'POST',
                body,
            }),
            transformResponse: (response: IResponse<{data: null}>, meta, arg) => response,   
            invalidatesTags: ['User']
        }),
        withdrawFund: build.mutation<any, IWithdraw>({
            query: (body) => ({
                url: '/fund/my-bank',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Wallet', 'Transaction', "UserTransaction"]
        }),
        fundWalletByCard: build.mutation<IResponse<IFundWalletResponse>, IFundWalletByCard>({
            query: (body) => ({
                url: '/fund/via/wallet-card',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Wallet', 'Transaction', "UserTransaction"],
            transformResponse: (response: IResponse<IFundWalletResponse>, meta, arg) => response,
        }),
        getAllBanks: build.query<IResponse<{data: IBanks[]}>, void>({
            query: () => ({
                url: "/guest/fetch-banks",
                method: 'GET'
            }),
            providesTags: ['Banks']
        }),
        getTransaction: build.query<IResponse<IGetTransactionResponse>, number>({
            query: (page) => ({
                url: "/wallet/transactions?page=" + page.toString(),
                method: "GET",
            }),
            providesTags: (result, error, args) => {
                return result ? [{type: "Transaction", id: args}] : [{type: "Transaction", id: "error"}]
            }
        }),
        getWalletDetails: build.query<IResponse<{data: IWalletDetails}>, void>({
            query: () => ({
                url: '/wallet/details',
                method: 'GET'
            }),
            providesTags: ['Wallet']
        }),
        getUserTransaction: build.query<IResponse<IPagination<IUserTransacation[]>>, number>({
            query: (page) => ({
                url: "/user/transactions?page=" + page.toString(),
                method: "GET",
            }),
            providesTags: (result, error, args) => {
                return result ? [{type: "UserTransaction", id: args}] : [{type: "UserTransaction", id: "error"}]
            }
        }),
    }),
})

export const { 
    useCreateAccountMutation,
    useFundWalletByCardMutation,
    useGetAllBanksQuery,
    useLazyGetAllBanksQuery,
    useWithdrawFundMutation,
    useLazyGetTransactionQuery,
    useGetWalletDetailsQuery,
    useGetUserTransactionQuery,
    useLazyGetUserTransactionQuery,
    useLazyGetWalletDetailsQuery
} = WalletApi