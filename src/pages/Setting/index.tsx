import { Routes, Route } from "react-router-dom";
import {DashboardWrapper }from "../../components/layout";
import EditProfile from "./editProfile";
// import EditStore from "./editStore";
// import Main from "./main";


export function SettingPage(){
    return(
        <DashboardWrapper>
            <Routes>
                {/* <Route element={<Main />} path="/" /> */}
                <Route element={<EditProfile />} path="/" />
                {/* <Route element={<EditStore />} path="/edit/vendor/:slug" /> */}
            </Routes>
        </DashboardWrapper>
    )
}

export default SettingPage