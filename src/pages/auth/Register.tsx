import { FormInput2 } from "../../components/material"
import { MailIcon, UserIcon } from "../../components/icons";
import { Link, useSearchParams } from 'react-router-dom'
import { FPRegister } from "./service";
import { useRegisterMutation } from "../../redux/api";
import { Alert, LoadingButton } from "@mui/lab";
import { Collapse } from "@mui/material";


export function Register(){
    const [regsiter, { isLoading, data, error }] = useRegisterMutation()
    const formik = FPRegister(regsiter)
    let searchParams = useSearchParams()[0]
    console.log(searchParams)
    return(
        <>
            <span className="font-light block my-3 px-2 sm:px-0">Provide us your accurate information</span>
            <form className="w-full mb-3 mt-2 sm:mt-4 px-2 sm:px-0" onSubmit={formik.handleSubmit}>
                <Collapse in={data?.status && true}>
                    <Alert severity={data?.status === 'success' ? "success" :"error"}>{data?.message}</Alert>
                </Collapse>
                <div className="md:flex justify-between md:space-x-3">
                    <FormInput2 
                        type="text"
                        name="first_name"
                        Icon={UserIcon}
                        label="First Name"
                        formik={formik}
                        className="my-2"
                    />

                    <FormInput2 
                        type="text"
                        name="last_name"
                        Icon={UserIcon}
                        label="Last Name"
                        formik={formik}
                        className="my-2"
                    />     
                </div>
                <div className="md:flex justify-between md:space-x-3">
                    <FormInput2 
                        type="text"
                        name="email"
                        Icon={MailIcon}
                        label="Email"
                        formik={formik}
                        className="my-2"
                    />

                    <FormInput2 
                        type="text"
                        name="phone_number"
                        Icon={UserIcon}
                        label="PhoneNumber"
                        formik={formik}
                        className="my-2"
                    />     
                </div>

                <div className="md:flex justify-between md:space-x-3">
                    <FormInput2 
                        type="password"
                        name="password"
                        Icon={UserIcon}
                        label="Password"
                        formik={formik}
                        className="my-2"
                    />

                    <FormInput2 
                        type="password"
                        name="password_confirmation"
                        Icon={UserIcon}
                        label="Comfirm Password"
                        formik={formik}
                        className="my-2"
                    />     
                </div>
                
                <LoadingButton 
                    loading={isLoading}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disableElevation
                    size="large"
                    className="mx-auto"
                    fullWidth>
                    Register
                </LoadingButton>
                <span className="font-light text-sm text-center block mt-2">Already have an account?  <Link to="/auth/login" className="text-primary-blue">Login </Link></span>
            </form>
        </>
    )
}



export default Register



 // {/* <Collapse in={data?.status === 'failed'}>
                    //     <Alert severity="error">{data?.message}</Alert>
                    // </Collapse>
                    // <Collapse in={data?.status === 'success' && !data.is_verified}>
                    //     <Alert severity="info">{data?.message}</Alert>
                    // </Collapse> */}
                    // {/* {data?.status === 'failed' && <Alert severity="error">{data.message}</Alert>} */}