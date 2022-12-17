import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { IBanks, ISelectOptions } from "../../interface";
import { ModalWrapper } from "../../components/modal";
import { FormInput, SelectInput } from "../../components/material";
import { FPFormikWithdraw } from "./service";
import { 
    useLazyGetAllBanksQuery, 
    useAgentWithdrawMutation
} from "../../redux/api";
import { NairaIcon, UserIcon } from "../../components/icons";


export function WithdrawalForm({open, close}: {open: boolean; close: () => void | any}){
    let [banks, setBanks] = useState<ISelectOptions[]>([])

    let [getBanks, {isLoading}] = useLazyGetAllBanksQuery()
    let [withdraw, { isLoading: withdrawing }] = useAgentWithdrawMutation()

    useEffect(() => {
        if(open){
            getBanks()
                .unwrap()
                .then(res => {
                    let banks = res.result.data.map(bank => ({label: bank.bank_name, value: bank.bank_name}))
                    setBanks(banks)
                })
                .catch((err) => console.log(err))
        }
    }, [isLoading, open])

    const formik = FPFormikWithdraw(withdraw, close)
    
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
                        name="account_name" 
                        label={"Account Name"}
                        Icon={UserIcon}
                        formik={formik}
                    />
                    <SelectInput 
                        name="bank_name" 
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
                        Icon={NairaIcon}
                        formik={formik}
                    />
                    <div className="flex justify-center items-center gap-4 my-8 w-10/12 mx-auto">

                        <Button
                            variant="outlined" 
                            type="button"
                            sx={{width: '50%'}}
                            onClick={close}>
                                Cancel
                        </Button>

                        <LoadingButton
                            loading={withdrawing}
                            variant="contained"
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