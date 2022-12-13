import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../context/auth';
import { IAuthResponse, ILogin, IRegister, IResetPassword, IResponse, ITrigger } from '../../interface';
import { toggleSnackBar } from '../../redux/slice';

export function FPLogin(login: ITrigger<ILogin, IAuthResponse>){
    const navigate = useNavigate()
    const { signIn } = useAuth()
    let initialValues = {
        email: '',
        password: ''
    }

    async function onSubmit (value: typeof initialValues, formikHelpers: FormikHelpers<ILogin | any>){
        console.log(value)
        try{
            let data = await login(value).unwrap()
            console.log(data)
            if(data.status === 'success'){
                signIn(`${data.token}`, () => {
                    if(data.is_verified){
                        // navigate('/register/step/4')
                        navigate('/dashboard') 
                    }
                    else{
                        navigate('/auth/verify/email?email=' + value.email)
                    }
                })
            }
        }
        catch(err){
            if(err){
                let error: any = err
                if(error.data.errors){
                    formikHelpers.setErrors(error.data.errors)
                }
            }
        }
    }

    let validationSchema = () => {
        return Yup.object({
            password: Yup.string().required('password field is required'),
            email: Yup
                .string()
                .required('email field is required')
                .email('Invalid email address'),
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}

export function FPRegister(register: ITrigger<IRegister, IAuthResponse>){
    const navigate = useNavigate()
    let searchParams = useSearchParams()[0]
    console.log(searchParams)

    let initialValues = {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    async function onSubmit (value: typeof initialValues, formikHelpers: FormikHelpers<IRegister | any>){
        try{
            let data = await register(value).unwrap()
            
            if(data.status === 'success'){
                navigate("/auth/verify/email?from=register")
            }
        }
        catch(err){
            if(err){
                let error: any = err
                if(error.data.errors){
                    formikHelpers.setErrors(error.data.errors)
                }

            }
        }
    }

    let validationSchema = () => {
        return Yup.object({
            first_name: Yup
                .string()
                .required('First Name field is required')
                .min(3),
            last_name: Yup
                .string()
                .required('Last Name field is required')
                .min(3),
            password: Yup
                .string()
                .required('password field is required')
                .min(6, 'Must be 6 characters or more'),
            email: Yup
                .string()
                .required('email field is required')
                .email('Invalid email address'),
            phone_number: Yup
                .string()
                .required('Phone Number field is required'),
            password_confirmation: Yup
                .string()
                .required('Please confirm password')
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}

export function FPVerification(resendVerificationLink: ITrigger<Omit<ILogin, 'password'>, IResponse<{data: null}>>, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, setIsSent: React.Dispatch<React.SetStateAction<boolean>>){
    let dispatch = useDispatch()
    
    let initialValues = {email: ''} 

    let validationSchema = () => (Yup.object({email: Yup.string().email().required()})) 

    let onSubmit = async (value: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues | any>) => {
        try{
            let data = await resendVerificationLink({email: value.email}).unwrap()
            if(data.status === 'success'){
                setOpenDialog(false)
                setIsSent(true)
                dispatch(toggleSnackBar({
                    open: true,
                    message: data.message,
                    severity: 'success'
                }))
            }
            else{
                dispatch(toggleSnackBar({
                    open: true,
                    message: data.message,
                    severity: 'error'
                }))
            }
        }
        catch(err){
            if(err){
                let error: any = err
                if(error.data.errors){
                    formikHelpers.setErrors(error.data.errors)
                }
            }
        }
    }
    const formik = useFormik({ 
        initialValues,
        validationSchema,
        onSubmit 
    })

    return formik
}

export function FPFormikForgetPassword(forgetPassword: ITrigger<Omit<ILogin, 'password'>, IResponse<any>>){
    let initialValues = {
        email: '',
    }

    async function onSubmit (value: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues | any>){
        try{
            console.log(value)
            let data = await forgetPassword(value).unwrap()
        }
        catch(err){
            console.log(err)
            if(err){
                let error: any = err
                if(error.data.errors){
                    formikHelpers.setErrors(error.data.errors)
                }
            }
        }
    }
    let validationSchema = () => {
        return Yup.object({
            email: Yup
                    .string()
                    .required('email field isRequired')
                    .email('Invalid email address'),
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}

export function FPFormikResetPassword(reset: ITrigger<IResetPassword, IResponse<any>>, data: {token?: string | null, email?: string | null}){
    let dispatch = useDispatch()

    let initialValues = {
        password: '',
        password_confirmation: '',
    }

    async function onSubmit (value: typeof initialValues, formikHelpers: FormikHelpers<IResetPassword | any>){
        try{
            if(value.password !== value.password_confirmation){
                formikHelpers.setErrors({'password_confirmation': "password and confirm password doesn't match"})
            }
            console.log(!data.token || !data.email)
            if(!data.token || !data.email){
                console.log(!data.token || !data.email)
                dispatch(toggleSnackBar({
                    open: true,
                    message: "Please genegarte a token by forgetting password",
                    severity: 'info'
                }))
            }
            else{
                let res = await reset({
                    ...value, 
                    token: data?.token,
                    email: data?.email
                }).unwrap()
            }
        }
        catch(err){
            if(err){
                let error: any = err
                if(error.data.errors){
                    formikHelpers.setErrors(error.data.errors)
                }
            }
        }
    }
    let validationSchema = () => {
        return Yup.object({
            password: Yup
                    .string()
                    .required('password field is Required')
                    .min(8, 'Must be 8 characters or more'),
            password_confirmation: Yup
                    .string()
                    .required('confirm password field is Required')
                    .min(8, 'Must be 8 characters or more'),
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}
