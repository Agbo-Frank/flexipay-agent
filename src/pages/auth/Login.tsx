import { FormInput2 } from "../../components/material"
import { MailIcon, UserIcon } from "../../components/icons";
import { Link } from 'react-router-dom'
import { FPLogin } from "./service";
import { useLoginMutation } from "../../redux/api";
import { Alert, LoadingButton } from "@mui/lab";
import { Collapse } from "@mui/material";


export function Login(){
    const [login, { isLoading, data }] = useLoginMutation()
    const formik = FPLogin(login)
    return(
        <>
            <span className="font-light block my-3 px-2 sm:px-0">Log into your account</span>
            
            <form className="space-y-2 px-2 sm:px-0 w-full mb-3 mt-2 sm:mt-4" onSubmit={formik.handleSubmit}>
                <Collapse in={data?.status === 'failed'}>
                    <Alert severity="error">{data?.message}</Alert>
                </Collapse>
                <Collapse in={data?.status === 'success' && data?.data?.roles?.includes("AGENT")}>
                    <Alert severity="success">{data?.message}</Alert>
                </Collapse>
                <Collapse in={data?.status === 'success' && !data?.data?.roles?.includes("AGENT")}>
                    <Alert severity="error">
                        Unauthorized User, 
                        <strong>
                            <Link to="/auth/register"> register </Link>
                        </strong> 
                        as an Agent or contact the admin to make you and agent
                    </Alert>
                </Collapse>
                {/* {data?.status === 'failed' && <Alert severity="error">{data.message}</Alert>} */}
                <FormInput2 
                    type="text"
                    label="Email"
                    name="email"
                    Icon={MailIcon}
                    formik={formik}
                />

                <FormInput2 
                    type="password"
                    label="Password"
                    name="password"
                    Icon={UserIcon}
                    formik={formik}
                />
                <Link to="/auth/forget-password" className='text-primary-blue text-sm ml-auto text-center float-right'>Forgotten your password?</Link>
                
                <LoadingButton 
                    loading={isLoading}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disableElevation
                    size="large"
                    className="mx-auto"
                    fullWidth>
                    Login
                </LoadingButton>
                <span className="font-light text-sm text-center block mt-2">Doesn’t have account?  <Link to="/auth/register" className="text-primary-blue cursor-pointer">Create Account Now</Link></span>
            </form>
        </>
    )
}



export default Login