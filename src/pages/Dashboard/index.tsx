import { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "../../components/StyleComponents";
import {DashboardWrapper} from "../../components/layout";
import { 
    BagIcon, CartIcon, 
    NairaIcon, WithdrawIcon 
} from "../../components/icons";
import {Iicon} from "../../interface";
// import { useGetOrderQuery } from "../../redux/slice/order";
// import { useGetVendorProductsQuery } from "../../redux/slice/productSlice";
// import { useGetVendorQuery } from "../../redux/slice/StoreSlice";
import { useGetUserQuery, useLazyGetWalletDetailsQuery } from "../../redux/api";
import { CreateAccForm } from "../Wallet/createAccForm";
import FundWallet from "../Wallet/FundWallet";
import { WalletBalance } from "../Wallet/WalletBalance";
import WithdrawalForm from "../Wallet/WithdrawalForm";
import NewUsers from "./NewUsers";

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
    let { user, loadingUser} = useGetUserQuery(undefined,{
        refetchOnFocus: true,
        refetchOnReconnect: true,
        selectFromResult: ({ data, isLoading}) => ({
            user: data?.result.data,
            loadingUser: isLoading
        })
    })

    let [getUserBalance, { data: wallet }] = useLazyGetWalletDetailsQuery()

    useEffect(() => {
        if(user?.reserved_account?.account_number){
            getUserBalance()
        }
    }, [user, loadingUser])
    let [open, setOpen] = useState({
        createAccForm: false,
        fundWallet: false,
        withdraw: false
    })
    return(
        <DashboardWrapper>
            <FundWallet open={open.fundWallet} close={() => setOpen(state => ({...state, fundWallet: false}))}/>
            <WithdrawalForm open={open.withdraw} close={() => setOpen(state => ({...state, withdraw: false}))}/>
            <CreateAccForm open={open.createAccForm} close={() => setOpen(state => ({...state, createAccForm: false}))}/>
            <div className="w-full md:pr-7 space-y-5">
                <div className="md:grid grid-cols-4 gap-3">
                    <DashboardCard 
                        color="#77CFBB"
                        Icon={BagIcon}
                        link="/product"
                        title="Total User"
                        count="10"
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
                        count={wallet?.result?.data?.balance || "0" }
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