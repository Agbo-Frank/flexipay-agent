import { useRef, useState } from "react"
import { TitlePage, Wrapper, } from "../../components/StyleComponents"
import { DashboardWrapper } from "../../components/layout"
import { 
    EditIcon,  WalletIcon, 
    WithdrawIcon 
} from "../../components/icons"
import FundWallet from "./FundWallet"
import WithdrawalForm from "./WithdrawalForm"
import { WalletTransaction } from "./WalletTransaction";
import { WalletBalance } from "./WalletBalance";
import { CreateAccForm } from "./createAccForm";
import { useGetUserQuery } from "../../redux/api/user";
import ReferralBalance from "./ReferralBalance"
import { Button } from "@mui/material"
// import UserTransaction from "./UserTransaction"



export function Wallet(){
    let [open, setOpen] = useState({
        createAccForm: false,
        fundWallet: false,
        withdraw: false
    })
    let [tab, setTab] = useState(0)

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
    return(
        <DashboardWrapper>
            {/* <AddCardModal /> */}
            <FundWallet open={open.fundWallet} close={() => setOpen(state => ({...state, fundWallet: false}))}/>
            <WithdrawalForm open={open.withdraw} close={() => setOpen(state => ({...state, withdraw: false}))}/>
            <CreateAccForm open={open.createAccForm} close={() => setOpen(state => ({...state, createAccForm: false}))}/>
            <div>
                <TitlePage>Wallet</TitlePage>
                <Wrapper styles="flex justify-center">

                    <div className="w-10/12 sm:w-4/12">
                        <WalletBalance open={open} setOpen={setOpen}/>
                    </div>

                    {/* <div className="my-3 ">
                        <ReferralBalance  open={open} setOpen={setOpen}/>
                    </div> */}

                    {/* <div className="my-3 flex flex-col justify-between p-3 bg-[#FFF9F7] rounded-md">
                        <div className="flex justify-between items-center">
                            <span className="text-[12px] font-light">Wallet ID: <span className="relative">Flexi237 <i className="text-[11px] fa-regular fa-clone absolute -top-1.5 -right-3.5"></i></span></span>
                            <i className="fa-solid text-[12.5px] fa-circle-info"></i>
                        </div>
                        <div className="flex flex-col space-y-2 justify-center items-center mt-7 text-[#545362]">
                            <WalletIcon color="#1900FE" size="40"/>
                            <span className="font-light">Current Balance</span>
                            <strong className="font-semibold text-[#545362">₦ 12,300</strong>
                        </div>
                        <div className="mt-14">
                            <Button
                            startIcon={<EditIcon color="white" size="16" />} 
                            variant="contained"
                            color="primary">
                                Fund Wallet
                            </Button>
                        </div>
                    </div> */}
                </Wrapper>
                {/* <div><SavedCard /></div> */}
                <div className="mt-5">
                    <div className="flex bg-white rounded-t-lg">
                        <div 
                        className={`mb-2 text-primary-dark-blue font-medium text-sm sm:text-base  py-3 px-2 hover:bg-gray-100 cursor-pointer`}
                        >Wallet Transaction</div>
                    </div>
                    <WalletTransaction open={open} setOpen={setOpen}/>
                    
                </div>
                
            </div>
        </DashboardWrapper>
    )
}

export default Wallet