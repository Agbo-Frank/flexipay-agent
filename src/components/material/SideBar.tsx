import React, { useLayoutEffect, useRef, useState } from "react";
import { Drawer } from "@mui/material";
import { 
    CartIcon, CreditCardIcon, 
    DashboardIcon, BagIcon, 
    SettingIcon, PromotionIcon, 
    SubscriptionIcon, LogOutIcon, UserIcon
} from "../icons";
import {Iicon} from "../../interface";
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from "@mui/material";
import { useAuth } from "../../context/auth";
import { useLogoutMutation } from "../../redux/api";
import { LoadingButton } from "@mui/lab";
// import { useGetVendorQuery } from "../redux/slice/StoreSlice";
import { ExtractTwoLetters } from "../../utils";

interface ISideBarItem {
    active?: boolean,
    Icon: React.FC<Iicon>;
    name: string;
    link: string;
    handleClick: (a:string) => void
}


function SideBarItem ({ active = false, Icon, name, link, handleClick}: ISideBarItem): JSX.Element {
    let [active_, setActive] = useState(false)
    let nav = useRef<HTMLAnchorElement>(null);

    useLayoutEffect(() => {
        if(nav.current?.classList.contains('active')){
            setActive(true)
        }
    })
    
    return(
        <NavLink 
        ref={nav}
        to={`/${link}`} 
        className={`flex capitalize rounded-lg py-3.5 mb-2 px-4 w-11/12 text-sm mx-auto gap-2 items-center cursor-pointer ${active_ ? 'bg-primary-blue font-medium text-white' : 'text-grey-200' }`} 
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => {if(!active)setActive(false)}}
        onClick={() => handleClick(link)}
        >
            <Icon size="16" color={active_ ? "white" :"#9A9AB0"}/>
            <p>{name}</p>
        </NavLink>
    )
}

export function SideBar(): JSX.Element {
    const [currentLocation, setLocation] = useState('')
    const { signout } = useAuth()

    let [logout, {isLoading: loggingOut}] = useLogoutMutation({
        fixedCacheKey: 'logout',
    })

    // let { store, buisness, loading} = useGetVendorQuery<any>(undefined, {
    //     selectFromResult: ({ data, isLoading }) => ({
    //         store: data?.result.data.vendor_profile,
    //         buisness: data?.result?.data?.business_details,
    //         loading: isLoading
    //     })
    // })


  return (
    <div className="w-full h-full bg-white border border-t-0 shrink-0">
        {/* <div className="flex space-x-2 items-center w-11/12 mx-auto border-b pt-5 pb-5 px-2 mb-4">
            <div className="uppercase rounded-xl w-16 h-16 grid place-items-center bg-grey-100 font-bold text-xl">{ExtractTwoLetters(`${store?.name}`)}</div>
            <div className="leading-5">
                <p>{store?.name}</p>
                <small className="text-xs">{buisness?.is_approved ? "Verified" : "Unverified"}</small>
            </div>
        </div> */}
        <div className="flex flex-col justify-between max-h-[95vh]">
            <div className="">
                <SideBarItem 
                Icon={DashboardIcon} name="Dashboard" link="dashboard"
                handleClick={setLocation}/>

                <SideBarItem 
                Icon={UserIcon} name="Users" link="user"
                handleClick={setLocation}/>

                <SideBarItem 
                Icon={CreditCardIcon} name="wallet" link="wallet"
                handleClick={setLocation}/>

                {/* <SideBarItem 
                Icon={CartIcon} name="order" link="order/all"
                handleClick={setLocation}/> */}

                {/* <SideBarItem 
                Icon={SubscriptionIcon} name="subscription" link="subscription"
                handleClick={setLocation}/>

                <SideBarItem 
                Icon={PromotionIcon} name="promotion" link="promotion"
                handleClick={setLocation}/> */}

            </div>

            <div className="mt-[50%]">
                <SideBarItem 
                Icon={SettingIcon} name="setting" link="setting"
                handleClick={setLocation}/>

                <LoadingButton
                    color='secondary'
                    startIcon={<LogOutIcon size="16" color="#FF5000"/>}
                    className="w-11/12 justify-start mx-auto"
                    sx={{
                        justifyContent: 'start',
                        paddingX: 3,
                        marginX: 1
                    }}
                    onClick={signout}
                    loading={loggingOut}
                >
                    Logout
                </LoadingButton>
            </div>
        </div>
    </div>
  );
}



export function MobileSideBar(): JSX.Element {
    const [visible, setVisible] = useState(false)
  return (
    <div className="relative lg:hidden">
      <button className="text-white bg-primary-blue p-3 rounded-r-lg fa fa-navicon fixed top-30 left-0 z-50" onClick={()=>setVisible(true)} />
      <Drawer anchor="left" open={visible} onClose={()=>setVisible(false)}>
        <div className="w-[70vw] md:w-[30vw] bg-white border border-t-0 shrink-0">
            <SideBar />
        </div>
      </Drawer>
    </div>
  );
}

export default SideBar;
