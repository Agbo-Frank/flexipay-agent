import { Button, Skeleton } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useLazyGetUserQuery } from "../../redux/api"
import { RootState } from "../../redux/store"
import { FLEXIPAY_USER_URL } from "../../utils/constants"
// import Drawer from "./Drawer"
import {Logo, BellIcon, SupportIcon} from "../icons"

export function Header(){
    let [openDrawer, setOpenDrawer] = useState(false)
    let code = useRef<HTMLDivElement>(null)
    let [copied, setCopied] = useState(false)

    async function copy(){
        navigator.clipboard.writeText(`${code.current?.innerHTML}`);
        setCopied(true)
        await setTimeout(() => setCopied(false), 5000)
    }
    
    let [getUser, { user, loading }] = useLazyGetUserQuery({
        selectFromResult: ({ data, isLoading}) => ({
            user: data?.result.data,
            loading: isLoading
        })
    })

    let isAuth = useSelector((state: RootState) => state.data.isAuth)

    useEffect(() => {
        if(isAuth){
            getUser()
        }
    }, [isAuth])

    console.log(user)

  return(
    <div className="w-full">
      <header className="w-full md:flex justify-between relative py-3 px-3  bg-white items-center border">
        <div className="py-2">
          <Logo />
          <div className="">

          </div>
        </div>
        <div className="py-2 w-full relative flex justify-between bg-w rounded-xl border-[#C6C6CA] items-center md:w-7/12 p-1 pl-3 border overflow-hidden h-fit">
          {loading ? (<Skeleton width="100%" sx={{fontSize: 14}}/>) : (<span ref={code} className="truncate"> {user?.referral_link}</span>)}
          <div 
            className="bg-primary-blue text-white px-5 h-full text-sm flex cursor-pointer items-center space-x-2 absolute right-0 top-0"
            onClick={copy}
          >
            {copied ? (<i className="fa-solid fa-circle-check"></i>) : (<i className="fa-solid fa-copy"></i>)}
            <span>{copied ? "Copied" : "Copy"}</span>
          </div>
            
        </div>
        <div className="absolute top-5 right-0 sm:relative sm:top-auto py-2 w-auto flex justify-between">
          <div className="hidden xs:block pt-2">
            <div 
              className="w-auto relative cursor-pointer"
              onClick={() => setOpenDrawer(state => !state)}
            >
              <BellIcon size="20" color="#9A9AB0"/> 
              <div className="bg-crimson absolute top-0 right-0 w-2 h-2 rounded-full" />
            </div>
          </div>
          <div className="px-5">
            {loading ? (
              <div className="flex justify-between items-center space-x-2 cursor-pointer">
                <Skeleton width={35} height={35} variant="circular" />
                <div className="flex flex-col justify-items-end">
                  <Skeleton sx={{fontSize: 12}} width={80} />
                  <Skeleton sx={{fontSize: 10}} width={60} />
                </div>
              </div> 
            ) : (
              <div className="flex justify-between items-center space-x-2 cursor-pointer">
                  <p className="w-8 h-8 rounded-full bg-grey-100 grid place-items-center uppercase">{`${user?.first_name}`[0]}{`${user?.last_name}`[0]}</p>
                  <div className="flex flex-col justify-items-end">
                    <p className="text-xs capitalize truncate font-medium text-primary-dark-blue">{user?.first_name} {user?.last_name}</p>
                    {/* <p className="text-xs text-grey-800">{user?.email}</p> */}
                  </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* <Drawer open={openDrawer} setOpenDrawer={setOpenDrawer}/> */}
    </div>
  )
}

export function AuthHeader(){
    return(
        <header className="w-full bg-white py-5 rounded-lg">
            <div className="px-5">
                <div className="flex justify-between items-center">
                    <p className="font-medium md:text-3xl text-grey-1200">Welcome To FlexiPay <span className="font-light text-primary-orange-200">Store</span></p>
                    <div className="">
                        <Button
                            variant="contained"
                            startIcon={<SupportIcon size="18" color="white" />}
                        >
                            Support
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header