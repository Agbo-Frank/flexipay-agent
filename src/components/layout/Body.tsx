import React from "react";
import {SnackBar }from "../material";

interface IBodyProps extends  React.PropsWithChildren{
  bgColor: string
}

export function Body({ children, bgColor }: IBodyProps): JSX.Element {
  return (
    <div className={`w-screen ${bgColor}`}>
        {children}
        <SnackBar />
    </div>
  );
}

export default Body;