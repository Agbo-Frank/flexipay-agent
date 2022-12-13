import { Button, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CopyIcon, GroupUserIcon, MarkCircleIcon, WalletIcon, WithdrawIcon } from "../../components/icons"
import { IWalletBalanceProps } from "../../interface";
import { useGetUserQuery } from "../../redux/api/user";
import { useLazyGetWalletDetailsQuery } from "../../redux/api/wallet";
import { formatNumber } from "../../utils";



export function ReferralBalance({ open, setOpen}: IWalletBalanceProps){
    let code = useRef<HTMLDivElement>(null)
    let [copied, setCopied] = useState(false)
    async function copy(){
        navigator.clipboard.writeText(`${code.current?.innerHTML}`);
        setCopied(true)
        await setTimeout(() => setCopied(false), 5000)
    }
    let { user, loading } = useGetUserQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            user: data?.result?.data,
            loading: isLoading
        })
    })

    let [getUserBalance, { data: wallet, isLoading }] = useLazyGetWalletDetailsQuery()

    useEffect(() => {
        if(user?.reserved_account?.account_number){
            getUserBalance()
        }
    }, [user, loading])

    console.log("wallet", wallet)
    return(
        <div className="flex flex-col justify-between p-3 bg-[#F9F8FF] rounded-md h-full">
            {
                loading ? 
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
                        <GroupUserIcon color="#1900FE" size="40"/>
                        <span className="text-center text-[#545362] text-lg font-medium">Create Account</span>
                        <span className="text-center text-[#545362] text-sm font-light">
                            Create an account on FlexiPay to enable you see your referral balance and withdraw from it   
                        </span>
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
                    <div className="flex justify-between items-center">
                        <span className="text-[12px] font-light">Referred</span>
                        <i className="fa-solid text-[12.5px] fa-circle-info"></i>
                    </div>
                    <div className="flex flex-col space-y-1 justify-center items-center">
                        <GroupUserIcon color="#1900FE" size="40"/>
                        <span className="font-light">Referial Balance</span>
                        <strong className="font-semibold text-[#545362]">₦ {formatNumber(wallet?.result.data.referral_balance)}</strong>
                        <p className="text-grey-700 text-xs text-center">
                            Use your referial link to refer your friends and start making money. for each person you refer, you will earn <span className="font-medium">₦500</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4 my-1 justify-between">
                        <div className="w-1/2">
                            <p className="hidden" ref={code}>{user?.referral_link}</p>
                            <Button 
                                color="primary" 
                                onClick={copy}
                                variant="outlined"
                                fullWidth
                                startIcon={copied ?<MarkCircleIcon color="#1900FE" size="16"/> :<CopyIcon color="#1900FE" size="14"/>}>
                                    { copied ? 'Copied!' : 'Copy' }
                            </Button>
                        </div>
                        <div className="w-1/2">
                            <Button
                                color="primary" 
                                onClick={() => setOpen(state => ({...state, withdraw: true}))}
                                variant="contained"
                                fullWidth
                                startIcon={<WithdrawIcon color="white" size="16"/>}>
                                    Withdraw
                            </Button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ReferralBalance