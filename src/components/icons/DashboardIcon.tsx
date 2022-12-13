import {Iicon} from "../../interface";

export function DashboardIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 8H8V0H0V8ZM2 2H6V6H2V2Z" fill={color}/>
      <path d="M0 18H8V10H0V18ZM2 12H6V16H2V12Z" fill={color}/>
      <path d="M10 18H18V10H10V18ZM12 12H16V16H12V12Z" fill={color}/>
      <path d="M10 0V8H18V0H10ZM16 6H12V2H16V6Z" fill={color}/>
    </svg>
  );
}

export default DashboardIcon;