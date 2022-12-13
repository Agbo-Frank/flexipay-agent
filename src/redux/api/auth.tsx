import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAuthResponse, ILogin, IRegister, IResetPassword, IResponse, IUser } from '../../interface'
import { FLEXIPAY_URL } from '../../utils/constants'
import { RootState } from '../store'

export const AuthApi = createApi({
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
    tagTypes: ['User', "Vendor"],
    reducerPath: 'Auth',
    endpoints: (build) => ({
        register: build.mutation<IAuthResponse, IRegister>({
            query: (body) => ({
                url: "/auth/register",
                method: 'POST',
                body,
            }),
            transformResponse: (response: IAuthResponse, meta, arg) => response, 
        }),
        login: build.mutation<IAuthResponse, ILogin>({
            query: (body) => ({
                url: "/auth/login",
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User', 'Vendor'],
            transformResponse: (response: IAuthResponse, meta, arg) => response
        }),
        forgotPassword: build.mutation<IResponse<any>, {email: string}>({
            query: (body) => ({
                url: "/auth/password/reset/link",
                method: 'POST',
                body
            }),
            transformResponse: (response:  any, meta, arg) => response,    
        }),
        resendVerification: build.mutation<IResponse<{data: null}>, {email: string}>({
            query: (body) => ({
                url: '/auth/resend-verification/link',
                method: 'POST',
                body
            }),
            transformResponse: (response: IResponse<{data: null}>, meta, arg) => response,
        }),
        logout: build.mutation<IResponse<any>, void>({
            query: () => {
                return {
                    url: "/auth/logout",
                    method: 'POST'
                }
            },
            invalidatesTags: ['User'],
            transformResponse: (response: any, meta, arg) => response
        }),
        resetPassword: build.mutation<IResponse<any>, IResetPassword>({
            query: (body) => ({
                url: "/auth/password/reset",
                method: 'POST',
                body
            }),
            transformResponse: (response: any, meta, arg) => response,    
        }),
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useResendVerificationMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = AuthApi