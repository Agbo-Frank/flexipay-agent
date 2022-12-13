import { createApi, fetchBaseQuery, SkipToken } from '@reduxjs/toolkit/query/react'
import { IUser, IResponse, IChangePassword } from '../../interface'
import { RootState } from '../store'
import { FLEXIPAY_URL } from '../../utils/constants'


export const UserApi = createApi({
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
    reducerPath: 'User',
    tagTypes: ['User'],
    refetchOnReconnect: true,
    endpoints: (build) => ({
        getUser: build.query<IResponse<{data: IUser}>, void>({
            query: () => ({
                url: "/user/profile",
                method: 'GET'
            }),
            transformResponse: (response: IResponse<{data: IUser}>, meta, arg) => response,
            providesTags: ['User']   
        }),
        editUser: build.mutation<IResponse<{data: null}>, Partial<IUser>>({
            query: (body) => ({
                url: "/user/profile",
                method: 'POST',
                body
            }),
            invalidatesTags: ['User'],
            transformResponse: (response: IResponse<{data: null}>, meta, arg) => response
        }),
        changePassword: build.mutation<IResponse<{data: null}>, IChangePassword>({
            query: (body) => ({
                url: '/auth/update-password',
                method: 'POST',
                body
            }),
            transformResponse: (response: IResponse<{data: null}>, meta, arg) => response
        })
    })
})

export const { 
    useGetUserQuery,
    useEditUserMutation,
    useChangePasswordMutation,
    useLazyGetUserQuery
} = UserApi