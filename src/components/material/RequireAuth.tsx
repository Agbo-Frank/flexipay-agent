import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";
import { useGetUserQuery } from "../../redux/api";
import { RootState } from "../../redux/store";

export function RequireAuth({ children }: React.PropsWithChildren) {
    let isAuth = useSelector((state: RootState) => state.data.isAuth)
    let location = useLocation();
    let { data: user, isLoading: loadingUser } = useGetUserQuery()

    if (!isAuth) {
        return <Navigate to={`/auth/login?redirect=${location.pathname.replace('/', '')}` } replace />;
    }
    if(!loadingUser && (!user?.result?.data || user?.status === 'failed')){
        return <Navigate to={`/auth/register` } replace />;
    }
  
    return (
        <>
            {children}
        </>
    )
  }

export default memo(RequireAuth)