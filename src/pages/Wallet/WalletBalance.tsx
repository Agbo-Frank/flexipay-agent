import { Button, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { EditSqaureIcon, WalletIcon } from "../../components/icons";
import { formatNumber } from "../../utils";
import useMediaQuery from '@mui/material/useMediaQuery';
import { IWalletBalanceProps } from "../../interface";
import { useLazyGetAgentBalanceQuery } from "../../redux/api";

export function WalletBalance({ open, setOpen}: IWalletBalanceProps){
    const matches = useMediaQuery('(min-width:640px)'); 

    let [getUserBalance, { wallet, isLoading }] = useLazyGetAgentBalanceQuery({
        selectFromResult: ({ data, isLoading }) => ({
            wallet: data?.result.data,
            isLoading 
        })
    })

    useEffect(() => {
        getUserBalance()
    }, [])
    return(
        <div className="flex flex-col text-center justify-between h-full p-3 border border-[#EDEEF0] rounded-md">
            {

                <>
                    <div className="flex justify-center">
                        <WalletIcon line={parseFloat(`${wallet?.current_balance}`) === 0} color="#1900FE" size={matches ? "40" : "30"}/>
                    </div>
                    <p className="text-grey-700 text-lg">Balance</p>
                    {
                        isLoading ? 
                        <Skeleton height={25} width="35%" className="mx-auto"/> :
                        <p className="text-primary-dark-blue font-semibold text-xl">₦ {formatNumber(wallet?.current_balance)} </p>
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