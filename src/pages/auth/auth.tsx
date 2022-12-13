import { Wrapper } from "../../components/StyleComponents"
import authenticationImage from '../../asset/authenticationImage.jpeg'
import { Tab, Tabs } from "@mui/material"
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useLocation, useParams } from "react-router-dom";


export function Auth(){
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location.pathname)
    const [value, setValue] = useState(location.pathname === '/auth/login' ? 1 : 0);
    useEffect(() => {
        if(location.pathname === '/auth/login'){
            setValue(1)
        }
        if(location.pathname === '/auth/register'){
            setValue(0)
        }
    }, [location.pathname])
    return(
        <Wrapper styles="w-full h-screen sm:h-[87vh] flex justify-center sm:items-center border">
            <div className="bg-[#F9F8FF] h-fit sm:p-3 rounded-lg w-full md:w-11/12 md:flex justify-between h-10/12">
                <div className="hidden md:block w-1/2 h-10/12">
                    <img src={authenticationImage} alt="authImg"  className="w-full rounded-2xl object-cover h-[400px]"/>
                </div>
                <div className="w-full md:w-1/2 bg-[#F9F8FF] rounded-2xl sm:p-2 md:p-5">
                    <Tabs value={value} onChange={(e, newValue) => {
                        if(newValue === 1){
                            navigate("/auth/login")
                        }
                        else{
                            navigate("/auth/register")
                        }
                        setValue(newValue)
                    }
                    }>
                        <Tab 
                            label="Register" 
                            sx={{
                                textTransform: 'capitalize', 
                                fontSize: 16, 
                                width: '50%', 
                                alignItems: 'center'
                            }}/>
                        <Tab 
                            label="Log In" 
                            sx={{
                                textTransform: 'capitalize', 
                                fontSize: 16, 
                                width: '50%', 
                                alignItems: 'center'
                            }}/>
                    </Tabs>

                    <Routes>
                        <Route path="/register" element={<Register />}/>
                        <Route path="/login" element={<Login />}/>
                    </Routes>
                </div>
            </div>
        </Wrapper>
    )
}

export default Auth