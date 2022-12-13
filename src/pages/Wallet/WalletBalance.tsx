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
                loadingUser ? 
                <>
                    <Skeleton height={15} width="40%"/>
                    <div className="flex justify-center">
                        <Skeleton height={50} width={50} variant="rectangular" />
                    </div>
                    <Skeleton height={20} width="50%" className="mx-auto"/>
                    <Skeleton height={25} width="35%" className="mx-auto"/>
                    <Skeleton height={15} width="95%" className="mx-auto"/>
                    <div className="flex justify-between space-x-4 w-11/12 mx-auto">
                        <Skeleton height={40} variant="rectangular" width="50%"/>
                        <Skeleton height={40} variant="rectangular" width="50%"/>
                    </div>
                </>:
                !user?.reserved_account?.account_number ? 
                    <div className="flex flex-col justify-around items-center self-stretch h-full space-y-3">
                        <WalletIcon color="#1900FE" size="40"/>
                        <span className="text-center text-[#545362] text-lg font-medium">Create Account</span>
                        <span className="text-center text-[#545362] text-sm font-light">Create an account on FlexiPay to be able to buy and pay for your orders seamlessly. </span>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => setOpen(state => ({...state, createAccForm: true}))}
                        >
                            Create Account
                        </Button> 
                    </div>
                :
                <>
                    <div className="flex justify-center">
                        <WalletIcon line={parseFloat(`${wallet?.result.data?.balance}`) === 0} color="#1900FE" size={matches ? "40" : "30"}/>
                    </div>
                    <p className="text-grey-700 text-lg">Balance</p>
                    {
                        isLoading ? 
                        <Skeleton height={25} width="35%" className="mx-auto"/> :
                        <p className="text-primary-dark-blue font-semibold text-xl">₦ {formatNumber(wallet?.result.data?.balance || 0)} </p>
                    }
                    {
                        isLoading ? 
                        <>
                            <Skeleton height={25} width="55%" className="mx-auto"/> 
                            <Skeleton height={25} width="65%" className="mx-auto"/>
                        </> :
                        <>
                            <p className="text-grey-700">Account no: <CopyText text={wallet?.result.data.account_number || "_____"}/></p>
                            <p className="text-grey-700">Bank: <CopyText text={wallet?.result.data.bank_name || "____"}/></p>
                        </>
                    }
                    {/* <p className="text-grey-700 text-sm">Click on the button below  to fund or Withdraw from your wallet</p> */}
                    <div className="flex justify-center space-x-4 items-center mx-auto my-4 w-full">
                        <Button
                            color="primary"
                            variant="contained"
                            startIcon={<EditSqaureIcon color="white" size="16"/>}
                            onClick={() => setOpen(state => ({...state, fundWallet: true}))}
                            size="large"
                        >
                            Fund Wallet
                        </Button>
                    </div>
                </>
            } 
        </div>
    )
}