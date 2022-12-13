import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { IBanks, ISelectOptions } from "../../interface";
import { ModalWrapper } from "../../components/modal";
import { FormInput, SelectInput } from "../../components/material";
import { FPFormikWithdraw } from "./service";
import { 
    useGetUserQuery, useLazyGetAllBanksQuery, 
    useWithdrawFundMutation 
} from "../../redux/api";
import { NairaIcon, UserIcon } from "../../components/icons";


export function WithdrawalForm({open, close}: {open: boolean; close: () => void | any}){
    let [banks, setBanks] = useState<ISelectOptions[]>([])

    let [getBanks, {isLoading}] = useLazyGetAllBanksQuery()
    let { data: user } = useGetUserQuery()
    let [withdraw, { isLoading: withdrawing }] = useWithdrawFundMutation()

    useEffect(() => {
        if(open){
            getBanks()
                .unwrap()
                .then(res => {
                    let banks = res.result.data.map(bank => ({label: bank.bank_name, value: bank.cbn_code}))
                    setBanks(banks)
                })
                .catch((err) => console.log(err))
        }
    }, [isLoading, open])

    const formik = FPFormikWithdraw(user?.result.data, withdraw, close)
    
    return(
        <ModalWrapper isOpen={open} size="medium" closeModal={close}>
            <div className="h-full overflow-y-auto scrollbar relative">
                <div className="sticky bg-white top-0 left-0 w-fit px-5 z-20 pb-2">
                    <p className="font-medium text-lg capitalize my-1">Cash Withdrawal</p>
                    <p className="font-light">Kindly provided  us with your information</p>
                </div>
                <form className="w-full px-8 my-7" onSubmit={formik.handleSubmit}>
                    <FormInput 
                        type="text" 
                        name="full_name" 
                        label={user?.result.data.first_name ? user?.result.data.first_name + " " + user?.result.data.last_name : "Full Name"}
                        Icon={NairaIcon}
                        formik={formik}
                    />
                    <SelectInput 
                        name="bank_code" 
                        label="Bank"
                        data={banks}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="account_number" 
                        label="Account Number"
                        Icon={UserIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="amount" 
                        label="Amount"
                        Icon={UserIcon}
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
                            loading={withdrawing}
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
        </ModalWrapper>
    )
}

export default WithdrawalForm