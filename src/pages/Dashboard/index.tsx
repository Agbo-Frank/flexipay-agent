import { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "../../components/StyleComponents";
import {DashboardWrapper} from "../../components/layout";
import { 
    NairaIcon, UserIcon,
} from "../../components/icons";
import {Iicon} from "../../interface";
import WithdrawalForm from "../Wallet/WithdrawalForm";
import NewUsers from "./NewUsers";
import { useLazyGetAgentDashboardQuery } from "../../redux/api/agent";

function DashboardCard({Icon, color, title, count, link}: {Icon: React.FC<Iicon>; color: string, title: string, link: string, count: string}){
    return(
        <Link
            to={link}
            className="flex justify-between rounded-lg items-center px-7 py-5 my-3" style={{backgroundColor: color}}>
            <div>
                <Icon color="white" size="24" />
                <small className="text-white text-xs capitalize truncate inline-block w-full">{title}</small>
            </div>
            <p className="text-white text-3xl font-bold">{count}</p>
        </Link>
    )
}


export function Dashboard(){
    let [getAgentDashboard, {data, isLoading}] = useLazyGetAgentDashboardQuery({
        selectFromResult: ({ data, isLoading}) => ({
            data: data?.result,
            isLoading
        })
    })
    console.log(data)
    let [open, setOpen] = useState({
        createAccForm: false,
        fundWallet: false,
        withdraw: false
    })

    useEffect(() => {
        getAgentDashboard()
    }, [])
    return(
        <DashboardWrapper>
            <WithdrawalForm open={open.withdraw} close={() => setOpen(state => ({...state, withdraw: false}))}/>
            <div className="w-full md:pr-7 space-y-5">
                <div className="md:grid grid-cols-4 gap-3">
                    <DashboardCard 
                        color="#77CFBB"
                        Icon={UserIcon}
                        link="/product"
                        title="Total User"
                        count={data?.users.toString() || "0"}
                    />
                    {/* <DashboardCard 
                        color="#F5A851"
                        Icon={NairaIcon}
                        link="/order/pending"
                        title="Total Earnings"
                        count={"10000"}
                    /> */}
                    <DashboardCard 
                        color="#766EDA"
                        Icon={NairaIcon}
                        link="/wallet"
                        title="Balance"
                        count={data?.account?.current_balance.toString() || "0" }
                    />
                </div>

                {/* <div className="flex flex-col md:flex-row justify-between gap-2 bg-transparent md:p-4 rounded-md">
                    <div className="w-full md:w-5/12 bg-white rounded-md">
                        <WalletBalance open={open} setOpen={setOpen}/>
                    </div>
                    <div className="w-full md:w-7/12 md:px-3">
                        <TopSellingProduct />
                    </div>
                </div>
                <Wrapper>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Newly Placed Orders</span>
                    </div>
                </Wrapper>*/}
                <NewUsers /> 
            </div>
        </DashboardWrapper>
    )
}

export default memo(Dashboard)











{/* <div className="w-1/2 rounded-lg border h-full"></div>
    <div className="w-1/2 rounded-lg border p-3 bg-white">
    <div className="rounded-lg bg-grey-500 h-full w-full p-5 space-y-8">
        <div className="flex justify-between items-center">
            <CreditCardIcon color="#1900FE" size="25" />
            <small className="font-light text-xs text-grey-200">Wallet ID: Flexi237</small>
        </div>
        <div>
            <p className="text-grey-200 text-sm">Current Balance</p>
            <p className="font-semibold text-2xl text-grey-1200">₦ 45,000</p>
        </div>
        <div className="flex justify-between items-center space-x-5">
            <Button color="#FF5000" outline>
                <div className="flex space-x-2">
                    <WithdrawIcon color="#FF5000" size="18" />
                    <p>Withdraw</p>
                </div>
            </Button>
            <Button 
                color="secondary"
                startIcon={<EditSqaureIcon color="white" size="18" />}
                variant="outlined"
                size="large"
                >Fund Wallet
            </Button>

            <Button 
                color="secondary"
                startIcon={<EditSqaureIcon color="white" size="18" />}
                variant="contained"
                size="large"
                >Fund Wallet
            </Button>
        </div>
    </div>
    </div> */}