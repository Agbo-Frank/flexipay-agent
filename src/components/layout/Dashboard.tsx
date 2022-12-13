import Body from "./Body";
import Header from "../material/Header";
import { SideBar, MobileSideBar } from "../material";
import React from "react";


export function DashboardWrapper ({children}: React.PropsWithChildren): JSX.Element {
    return(
        <Body bgColor="bg-grey-500 w-full">
            <div className="w-full h-fit">
                
                <Header />
                <div 
                    className="md:flex justify-between items-stretch h-full overflow-y-hidden"
                >
                    <MobileSideBar />
                    <div className="hidden lg:block w-[20%]">
                        <SideBar />
                    </div>
                    <div className="w-full lg:w-[80%] h-full pt-5 px-3 md:px-5">
                        {children}
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default DashboardWrapper