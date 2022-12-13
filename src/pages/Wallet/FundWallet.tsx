import { FormInput } from "../../components/material"
import {
    ModalWrapper
} from "../../components/modal"
import { MailIcon, NairaIcon, PhoneIcon, UserIcon } from "../../components/icons"
import { Button } from "@mui/material";
import { FundWalletByCard } from "./service";
import { LoadingButton } from "@mui/lab";
import { 
    useLazyGetUserQuery,
    useFundWalletByCardMutation
} from "../../redux/api";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toggleSnackBar } from "../../redux/slice";
import { useSearchParams } from "react-router-dom";


export function FundWallet({open, close}: {open: boolean; close: () => void | any}){
    let [getUser, { data }] = useLazyGetUserQuery()
    let [fundwallet, { isLoading }] = useFundWalletByCardMutation()

    let [searchParams, setSearchParams] = useSearchParams();
    let [transactionFeedBack, setTransactionFeedBack] = useState(searchParams.get('status'))

    let formik = FundWalletByCard(fundwallet, close)

    const dispatch = useDispatch()
    console.log(data)

    useEffect(() => {
        getUser()
    }, [open])

    useEffect(() => {
        if(transactionFeedBack === 'successful'){
            dispatch(toggleSnackBar({
                open: true,
                message: "Transaction was Successful",
                severity: 'success'
            }))
        }
        if(transactionFeedBack === 'cancelled'){
            dispatch(toggleSnackBar({
                open: true,
                message: "Transaction was " + transactionFeedBack,
                severity: 'error'
            }))
        }
        setSearchParams('');
    }, [transactionFeedBack])
    return(
        <ModalWrapper isOpen={open} closeModal={close}>
            <div className="h-full overflow-y-auto scrollbar relative">
                <div className="sticky bg-white top-0 left-0 w-fit px-5 z-20 pb-2">
                    <p className="font-medium text-lg capitalize my-1">Fund Wallet</p>
                    <p className="font-light">Fund your wallet by card</p>
                </div>

                <form className="w-full px-8 my-7" onSubmit={formik.handleSubmit}>
                    <FormInput
                        type="text" 
                        name="full_name" 
                        label={
                            data?.result.data.first_name ? 
                            data?.result.data.first_name + " " + data?.result.data.last_name :
                            "Full Name"
                        }
                        Icon={UserIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="email" 
                        name="email" 
                        label={data?.result.data.email || "Email"}
                        Icon={MailIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="phone_number" 
                        label={data?.result.data.phone_number || "Phone Number"}
                        Icon={PhoneIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="amount" 
                        label="Amount"
                        Icon={NairaIcon}
                        formik={formik}
                    />
                    <div className="flex justify-center items-center gap-4 my-8 w-10/12 mx-auto">

                        <Button
                            variant="outlined" 
                            color="secondary" 
                            type="button"
                            sx={{width: '50%'}}
                            onClick={close}>
                                Cancel
                        </Button>

                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            disableElevation
                            size="large"
                            sx={{width: '50%'}}>
                                Fund Wallet
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </ModalWrapper>
    )
}

export default FundWallet
























{/* <ModalWrapper isOpen={open} closeModal={close}>
            <div className="h-full overflow-y-auto scrollbar relative">
                <div className="sticky bg-white top-0 left-0 w-fit px-5 z-20 pb-2">
                    <p className="font-medium text-lg capitalize my-1">Fund Wallet</p>
                    <p className="font-light">Fund your wallet by card</p>
                </div>

                <form className="w-full px-8 my-7" onSubmit={formik.handleSubmit}>
                    <FormInput
                        type="text" 
                        name="full_name" 
                        label={
                            data?.result.data.first_name ? 
                            data?.result.data.first_name + " " + data?.result.data.last_name :
                            "Full Name"
                        }
                        Icon={UserIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="email" 
                        name="email" 
                        label={data?.result.data.email || "Email"}
                        Icon={MessageIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="phone_number" 
                        label={data?.result.data.phone_number || "Phone Number"}
                        Icon={PhoneIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="amount" 
                        label="Amount"
                        Icon={NairaIcon}
                        formik={formik}
                    />
                    <div className="flex justify-center items-center gap-4 my-8 w-10/12 mx-auto">

                        <Button
                            variant="outlined" 
                            color="secondary" 
                            type="button"
                            sx={{width: '50%'}}
                            onClick={close}>
                                Cancel
                        </Button>

                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            disableElevation
                            size="large"
                            sx={{width: '50%'}}>
                                Withdraw
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </ModalWrapper> */}