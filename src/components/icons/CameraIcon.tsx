import {Iicon} from "../../interface";

export function CameraIcon({size, color}: Iicon){
    return(
        <svg width={size} height={size} viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.99999 11.8801C10.5906 11.8801 11.88 10.5907 11.88 9.00012C11.88 7.40954 10.5906 6.12012 8.99999 6.12012C7.40941 6.12012 6.12 7.40954 6.12 9.00012C6.12 10.5907 7.40941 11.8801 8.99999 11.8801Z" fill={color}/>
            <path d="M6.3 0L4.653 1.8H1.8C0.81 1.8 0 2.61 0 3.6V14.4C0 15.39 0.81 16.2 1.8 16.2H16.2C17.19 16.2 18 15.39 18 14.4V3.6C18 2.61 17.19 1.8 16.2 1.8H13.347L11.7 0H6.3ZM9 13.5C6.516 13.5 4.5 11.484 4.5 9C4.5 6.516 6.516 4.5 9 4.5C11.484 4.5 13.5 6.516 13.5 9C13.5 11.484 11.484 13.5 9 13.5Z" fill={color}/>
        </svg>
    )
}

export default CameraIcon