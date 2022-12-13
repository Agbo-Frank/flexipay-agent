import { Button, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { CopyText } from "../../components/material";
import { EditSqaureIcon, WalletIcon, WithdrawIcon } from "../../components/icons";
import { useGetUserQuery } from "../../redux/api/user";
import { useLazyGetWalletDetailsQuery } from "../../redux/api/wallet";
import { formatNumber } from "../../utils";
import useMediaQuery from '@mui/material/useMediaQuery';
import { IWalletBalanceProps } from "../../interface";

export function WalletBalance({ open, setOpen}: IWalletBalanceProps){
    const matches = useMediaQuery('(min-width:640px)'); 
    let { user, loadingUser} = useGetUserQuery(undefined,{
        selectFromResult: ({ data, isLoading}) => ({
            user: data?.result.data,
            loadingUser: isLoading
        })
    })

    let [getUserBalance, { data: wallet, isLoading }] = useLazyGetWalletDetailsQuery()

    useEffect(() => {
        if(user?.reserved_account?.account_number){
            getUserBalance()
        }
    }, [user, loadingUser])

    return(
        <div className="flex flex-col text-center justify-between h-full p-3 border border-[#EDEEF0] rounded-md">
            {

                <>
                    <div className="flex justify-center">
                        <WalletIcon line={parseFloat(`${wallet?.result.data?.balance}`) === 0} color="#1900FE" size={matches ? "40" : "30"}/>
                    </div>
                    <p className="text-grey-700 text-lg">Balance</p>
                    {
                        isLoading ? 
                        <Skeleton height={25} width="35%" className="mx-auto"/> :
                        <p className="text-primary-dark-blue font-semibold text-xl">₦ {formatNumber(10000)} </p>
                    }
                    {/* <p className="text-grey-700 text-sm">Click on the button below  to fund or Withdraw from your wallet</p> */}
                    <div className="flex justify-center space-x-4 items-center mx-auto my-4 w-full">
                        <Button
                            color="primary"
                            variant="contained"
                            startIcon={<EditSqaureIcon color="white" size="16"/>}
                            onClick={() => setOpen(state => ({...state, withdraw: true}))}
                            size="large"
                        >
                            Withdraw
                        </Button>
                    </div>
                </>
            } 
        </div>
    )
}