import React from 'react';
import { LoadingButton } from "@mui/lab";
import { FormInput2 } from "../../components/material";
import { Wrapper } from "../../components/StyleComponents";
import VerifiedIcon from '@mui/icons-material/Verified';
import { useResendVerificationMutation } from "../../redux/api";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { MailIcon, MarkCircleIcon } from "../../components/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { verifyLink } from "../../utils";
import { toggleSnackBar } from "../../redux/slice";
import { useDispatch } from "react-redux";
import { SnackBar } from "../../components/material";
import { FPVerification } from "./service";


export function VerifyEmail(){
    let [searchParams, setSearchParams] = useSearchParams()
    let [openDialog, setOpenDialog] = useState(false)
    let [isSent, setIsSent] = useState(false)
    let [verified, setVerified] = useState(false)

    let dispatch = useDispatch()

    let [resendVerificationLink, {isLoading, data}] = useResendVerificationMutation()

    const formik = FPVerification(resendVerificationLink, setOpenDialog, setIsSent)

    async function sendLink(){
        if(!isSent){
            if(searchParams.has('email')){
                let data = await resendVerificationLink({email: `${searchParams.get('email')}`}).unwrap()
                if(data){
                    dispatch(toggleSnackBar({
                        open: true,
                        message: data.message,
                        severity: data.status === 'success' ? 'success' : 'error'
                    }))
                }

                if(data.status === 'success'){
                    setIsSent(true)
                    setVerified(true)
    
                    await setTimeout(() => setIsSent(false), (1000 * 60 * 2));
                }
            }
            else{
                setOpenDialog(true)
            }
        }
        else{
            dispatch(toggleSnackBar({
                open: true,
                message: 'Verification link sent already',
                severity: 'info'
            }))
        }
    }

    useEffect(() => {
        if(searchParams.has('verify_url')){
            verifyLink(`${searchParams.get('verify_url')}`)
                .then(data => {
                    if(data){
                        dispatch(toggleSnackBar({
                            open: true,
                            message: data.message,
                            severity:data.status === 'success' ? 'success' : 'error'
                        }))
                        if(data.status === 'success'){
                            setSearchParams("")
                            setVerified(true)
                        }
                    }
                })
                .catch(err => console.log(err))
        }
        if(searchParams.has('from')){
            setIsSent(true)
            setTimeout(() => setIsSent(false), (1000 * 60 * 2));
        }
    }, [searchParams])

    return(
        <div className="w-full">
            <Wrapper styles="w-full h-[87vh] flex justify-center sm:items-center">
                <div className="w-full md:w-[850px] bg-[#F9F8FF] h-4/6 grid place-items-center py-5">
                    <div className="md:w-6/12 mx-auto flex justify-center items-center flex-col text-center w-full">
                        {
                            verified ? 
                            <MarkCircleIcon color="#6DBD28" size="65"/>:
                            <VerifiedIcon color="success" sx={{fontSize: 65}}/>
                        }
                        <h4 className="text-lg">{verified ? "Email Verified" : "Email Verification" }</h4>
                        {
                            verified ?
                            <p>Your email has be verfied please <Link className="text-primary-orange-200 font-medium" to="/auth/login">Login</Link></p>:
                            <p className="font-light">
                                No one likes bots. Kindly verify your email address by clicking on the link sent to your email address. 
                                If you are facing any problems doing this, kindly reach out to out support team. 
                            </p>
                        }
                        {
                            !verified && isSent ? 
                            <small className='text-primary-orange-200 font-medium cursor-pointer'>Verification link sent</small>:
                            <span className="block font-light">
                                Didn’t recieve any mail?
                                <i 
                                    className="text-primary-orange-200 font-medium cursor-pointer" 
                                    onClick={sendLink}>
                                        Resend Verification link
                                </i>
                            </span>
                        }
                    </div>
                </div>
            </Wrapper>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Resend verification Link</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Verify your account by providing your email adddress
                    </DialogContentText>
                    <form onSubmit={formik.handleSubmit}>
                        <FormInput2 
                            type="email"
                            name="email"
                            label="Email"
                            Icon={MailIcon}
                            formik={formik}
                        />

                        <DialogActions>
                            <Button
                            onClick={() => setOpenDialog(false)}
                            variant="outlined">Cancel</Button>
                            <LoadingButton
                            type="submit"
                            loading={isLoading}
                            variant="contained">
                                Resend
                            </LoadingButton>
                            
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <SnackBar />
        </div>
    )
}

export default VerifyEmail

// <Collapse in={data?.status === 'failed'}>
//     <Alert severity="error">{data?.message}</Alert>
// </Collapse>
// <Collapse in={data?.status === 'success' && !data.is_verified}>
//     <Alert severity="info">{data?.message}</Alert>
// </Collapse>