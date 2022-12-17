import { createApi, fetchBaseQuery, SkipToken } from '@reduxjs/toolkit/query/react'
import { IUser, IResponse, IChangePassword, IAgentUsers, IAgentWallet, IPagination, IAgentWithdraw, IAgentDashboardDetails } from '../../interface'
import { RootState } from '../store'
import { FLEXIPAY_URL } from '../../utils/constants'


export const AgentApi = createApi({
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
    reducerPath: 'Agent',
    tagTypes: ['Agent', "AgentUser", "AgentWallet"],
    refetchOnReconnect: true,
    endpoints: (build) => ({
        getAgentDashboard: build.query<IResponse<IAgentDashboardDetails>, void>({
            query: () => ({
                url: "/agent/dashboard",
                method: 'GET'
            }),
            transformResponse: (response: IResponse<IAgentDashboardDetails>, meta, arg) => response,
            providesTags: ['Agent']   
        }),
        getAgentUsers: build.query<IResponse<IPagination<IAgentUsers[]>>, {quantity?: number}>({
            query: (params) => ({
                url: "/agent/referred?quantity=" + params.quantity,
                method: 'GET',
            }),
            providesTags: ['AgentUser'],
            transformResponse: (response: IResponse<IPagination<IAgentUsers[]>>, meta, arg) => response
        }),
        getAgentBalance: build.query<IResponse<{data: IAgentWallet}>, void>({
            query: () => ({
                url: '/agent/wallet',
                method: 'GET'
            }),
            providesTags: ['AgentWallet'],
            transformResponse: (response: IResponse<{data: IAgentWallet}>, meta, arg) => response
        }),
        agentWithdraw: build.mutation<IResponse<{data: IAgentWallet}>, IAgentWithdraw>({
            query: (body) => ({
                url: '/agent/withdrawals',
                method: 'POST',
                body
            }),
            transformResponse: (response: IResponse<{data: IAgentWallet}>, meta, arg) => response
        })
    })
})

export const { 
    useLazyGetAgentDashboardQuery,
    useLazyGetAgentBalanceQuery,
    useLazyGetAgentUsersQuery,
    useAgentWithdrawMutation
} = AgentApi