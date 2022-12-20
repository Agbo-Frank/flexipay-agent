import { FormikConfig, FormikHelpers, useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { IResponse, ITrigger, IUser } from '../../interface'
import { toggleSnackBar } from '../../redux/slice'


export function FPFormikEditUser(user: IUser | undefined, edit: ITrigger<Partial<IUser>, IResponse<null | any>>){
    let dispatch = useDispatch()

    let initialValues = {
        ...user
    }

    async function onSubmit (value: Partial<IUser>, formikHelpers: FormikHelpers<IUser| any>){
        console.log(value)
        value = {
            first_name: value.first_name || user?.first_name,
            last_name: value.last_name || user?.last_name,
            email: value.email || user?.email,
            phone_number: value.phone_number || user?.phone_number,
            state: value.state || user?.state,
            city: value.city || user?.city,
            gender: value.gender || user?.gender,
            house_address: value.house_address || user?.house_address,
            dob: value.dob || user?.dob,
            nearest_bus_stop: value.nearest_bus_stop || user?.nearest_bus_stop,
            postal_code: value.postal_code || user?.postal_code
        }
        console.log(value)
        try{
            let data = await edit(value).unwrap()
            console.log(data)
            
            if(data.status === 'success'){
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
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
        }
        catch(err){
            console.log(err)
            if(err){
                let error: any = err

                if(error?.data?.errors){
                    formikHelpers.setErrors(error.data.errors)
                }
                dispatch(toggleSnackBar({
                    message: error.data.message,
                    open: true,
                    severity: 'error'
                }))
            }
        }
        
    }

    let validationSchema = () => {
        return Yup.object({
            firstName: Yup.string(),
            lastName: Yup.string(),
            email: Yup.string(),
            phoneNumber: Yup.string(),
            state: Yup.string(),
            lga: Yup.string(),
            house_address: Yup.string()
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    

    return formik
}