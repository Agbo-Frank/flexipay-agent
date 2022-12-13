import React from "react";

interface IWrapperProps extends  React.PropsWithChildren{
    styles?: string
}


export function Wrapper({children, styles}: IWrapperProps){
    return(
        <div className={`rounded-lg bg-white py-3 px-3 sm:px-6 ${styles}`}>
            {children}
        </div>
    )
}

export function TitlePage({children}: React.PropsWithChildren){
    return(
        <h2 className="text-[#11142D] md:text-2xl capitalize font-medium">
            {children}
        </h2>
    )
}

export function WrapperHeader({children, styles}: IWrapperProps){
    return(
        <h3 className={`text-grey-#222222 font-medium ${styles}`}>
            {children}
        </h3>
    )
}

export function CardWrapper({children, styles}: IWrapperProps){
    return(
        <div className={`flex flex-col sm:flex-row justify-between rounded sm:rounded-lg w-full sm:hover:shadow-lg shadow-md border-solid items-center p-3 sm:p-4 mb-3 bg-white ${styles} whitespace-pre-wrap truncate`}>
            {children}
        </div>
    )
}

export function CardActions({children, styles}: IWrapperProps){
    return(
        <div className={`flex w-full sm:w-[20%] justify-between border-t pt-3 sm:pt-0 flex-row-reverse sm:flex-col sm:space-y-3 ${styles}`}>
            {children}
        </div>
    )
}

export function CardImg({ src }: {src: string}){
    return(
        <img src={src} alt="" className="w-[100px] h-[100px] sm:w-[148px] sm:h-[148px]  object-cover rounded sm:rounded-md"/>
    )
}

export function CardText({children, styles}: IWrapperProps){
    return(
        <span className={`whitespace-normal sm:w-11/12 text-black sm:text-grey-200 font-semibold sm:font-normal text-sm sm:text-base sm:mb-2 ${styles}`}>
            {children}
        </span>
    )
}

export function CardContentText({children, styles}: IWrapperProps){
    return(
        <div className={`flex flex-col sm:w-6/12 sm:h-full items-stretch sm:justify-evenly ${styles}`}>
            {children}
        </div>
    )
}