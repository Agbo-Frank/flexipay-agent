import { AuthHeader } from "../../components/material"
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./auth";
import ForgetPassword from "./ForgetPassword";
import VerifyEmail from "./verifyEmail";
import { SnackBar } from "../../components/material";


export function AuthRoute(){
    return(
        <div className="w-full">
            <AuthHeader />
            <Routes>
                <Route path="/*" element={<Auth />}/>
                {/* <Route path="/create/*" element={<Create />}/> */}
                <Route path="/forget-password" element={<ForgetPassword />}/>
                <Route path="/verify/email" element={<VerifyEmail />}/>
            </Routes>
            <SnackBar />
        </div>
    )
}

export default AuthRoute