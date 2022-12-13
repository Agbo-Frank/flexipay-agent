import { LoadingButton } from "@mui/lab"
import { Alert, Button, Collapse } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { FormInput2 } from "../../components/material"
import { Wrapper } from "../../components/StyleComponents"
import { MailIcon, PadLock } from "../../components/icons"
import { useForgotPasswordMutation } from "../../redux/api"
import { FPFormikForgetPassword } from "./service"



export function ForgetPassword(){
    let [forgetPassword, { isLoading, data}] = useForgotPasswordMutation()
    let formik = FPFormikForgetPassword(forgetPassword)
    const navigate = useNavigate()
    return(
        <Wrapper styles="w-full h-[87vh] flex justify-center sm:items-center">
            <div className="w-full md:w-[850px] bg-[#F9F8FF] h-4/6 grid place-items-center py-5">
                <form className="w-full md:w-6/12 mx-auto flex justify-center flex-col items-center" onSubmit={formik.handleSubmit}>
                    <PadLock color="#1900FE" size="50"/>
                    <h4 className="font-medium mt-2">Password Reset</h4>
                    <span className="font-light text-center inline-block my-3">We’ll send you a password reset link via your email address</span>
                    <Collapse in={data?.status === 'failed'}>
                        <Alert severity="error">{data?.message}</Alert>
                    </Collapse>
                    <Collapse in={data?.status === 'success'}>
                        <Alert severity="success">{data?.message}</Alert>
                    </Collapse>
                    <div className="mt-3 w-full">
                        <FormInput2 
                            type="text"
                            label="email"
                            name="email"
                            Icon={MailIcon}
                            formik={formik}
                        />
                    </div>

                    <div className="md:flex justify-between w-full my-4">
                        <div className="my-2 w-full md:w-1/2 md:px-3">
                            <Button 
                                variant="outlined" 
                                size="large" 
                                className="w-full" 
                                onClick={()=>navigate(-1)}>Cancel</Button>
                        </div>
                        <div className="my-2 w-full md:w-1/2 md:px-3">
                            <LoadingButton 
                                loading={isLoading}
                                type="submit"
                                variant="contained"
                                className="w-full h-full"
                            >
                                Send Reset Link
                            </LoadingButton>
                        </div>
                    </div>
                </form>
            </div>
        </Wrapper>
    )
}

export default ForgetPassword