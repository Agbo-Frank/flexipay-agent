import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { IAgentWithdraw, ICreateAccountBody, IFundWalletByCard, IFundWalletResponse, IResponse, ITrigger, IUser, IWithdraw } from '../../interface';
import { validURL } from '../../utils';
import { toggleSnackBar } from '../../redux/slice/modal';
import { FormikHelpers, useFormik } from 'formik';
import { useGetUserQuery } from '../../redux/api/user';


export function FundWalletByCard(fundWallet: ITrigger<IFundWalletByCard, IResponse<IFundWalletResponse>>, done: () => void | any){
    let {data} = useGetUserQuery()
    let dispatch = useDispatch()
    
    let initialValues: IFundWalletByCard = {
        full_name: "",
        email: "",
        phone_number: "",
        amount: "",
    }

    async function onSubmit (value: IFundWalletByCard, formikHelpers: FormikHelpers<IFundWalletByCard | any>){
        value = {
            full_name: data?.result.data.first_name ? 
                    data?.result.data.first_name + " " +  data?.result.data.last_name :
                    value.full_name,
            email: data?.result.data.email || value.email,
            phone_number: data?.result.data.phone_number || value.phone_number,
            amount: value.amount,
            redirect_url: 'http://localhost:3000/wallet'
        }
        console.log(value)
        try{
            let data = await fundWallet(value).unwrap() 
            if(data.status === 'success'){
                if(validURL(data.result.data.link)){
                    window.location.replace(data.result.data.link)
                }
                else{
                    dispatch(toggleSnackBar({
                        message: "Invalid URL, Try again",
                        open: true,
                        severity: 'error'
                    }))
                }
                done()
            }
            else{
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: 'error'
                }))
                done()
            }
        }
        catch(err){
            if(err){
                let error: any = err
                formikHelpers.setErrors(error.data.errors)
            }
        }
    }

    let validationSchema = () => {
        return Yup.object({
            full_name: Yup.string(),
            email: Yup.string().email(),
            phone_number: Yup.string(),
            amount: Yup
                .string()
                .required('Please enter the amount your want to withdraw')
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik

}

export function FPFormikWithdraw(withdraw: ITrigger<IAgentWithdraw, IResponse<{data: any}>>, done: () => void | any){
    let dispatch = useDispatch()

    let initialValues: IAgentWithdraw = {
        account_number: '',
        account_name: '',
        bank_name: '',
        amount: ''
    }

    async function onSubmit (value: IAgentWithdraw, formikHelpers: FormikHelpers<IAgentWithdraw | any>){
        console.log(value)
        try{
            let data = await withdraw(value).unwrap()
            console.log(data)
            
            if(data.status === 'success'){
                dispatch(toggleSnackBar({
                    open: true,
                    message: data.message,
                    severity: 'success'
                }))
            }
            else{
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: 'error'
                }))
            }
            done()
        }
        catch(err){
            if(err){
                let error: any = err
                console.log(error)
                if(error.data.errors){
                    formikHelpers.setErrors(error.data.errors)
                }
                if(error?.data){
                    dispatch(toggleSnackBar({
                        message: error?.data?.message,
                        open: true,
                        severity: 'error'
                    }))
                }
                else{
                    dispatch(toggleSnackBar({
                        message: "An error just occured please try again",
                        open: true,
                        severity: 'error'
                    }))
                }
            }
        }
    }

    let validationSchema = () => {
        return Yup.object({
            account_name: Yup
                .string(),
            account_number: Yup
                .string()
                .required('Account Number field is required')
                .min(10, 'please enter a valid account number'),
            bank_name: Yup
                .string()
                .required('Please select your bank name'),
            amount: Yup
                .string()
                .required('Please enter the amount your want to withdraw')
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}

export function FPcreateAccForm(userData: IUser | null | undefined, createAccount: ITrigger<ICreateAccountBody, IResponse<{data: null}>>, done:() => any){
    let initialValues: ICreateAccountBody = {
        first_name:  "",
        last_name: "",
        email: "",
        phone_number: "",
        bvn: ""
    }

    let dispatch = useDispatch()

    async function onSubmit (value: ICreateAccountBody, formikHelpers: FormikHelpers<ICreateAccountBody | any>){
        value = {
            first_name: userData?.first_name || value.first_name,
            last_name: userData?.last_name || value.last_name,
            email: userData?.email || value.email,
            phone_number: userData?.phone_number || value.phone_number,
            bvn: value.bvn
        }

        try{
            let data = await createAccount(value).unwrap();
            if(data.status === 'success'){
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: 'success'
                }))

                window.location.reload()
            }
            else{
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: 'error'
                }))
            }
            done()
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
            first_name: Yup.string(),
            last_name: Yup.string(),
            email: Yup.string().email(),
            phone_number: Yup.string(),
            bvn: Yup
                .string()
                .required('BVN field is Required')
                .length(11)
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}