import {Iicon} from "../../interface";

export function SupportIcon({size, color}: Iicon){
    return(
        <svg width={size} height={size} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 20L9.25 17H9C6.63333 17 4.625 16.175 2.975 14.525C1.325 12.875 0.5 10.8667 0.5 8.5C0.5 6.13333 1.325 4.125 2.975 2.475C4.625 0.825 6.63333 0 9 0C10.1833 0 11.2873 0.220667 12.312 0.662C13.3373 1.104 14.2377 1.71233 15.013 2.487C15.7877 3.26233 16.3957 4.16233 16.837 5.187C17.279 6.21233 17.5 7.31667 17.5 8.5C17.5 9.75 17.296 10.95 16.888 12.1C16.4793 13.25 15.921 14.3167 15.213 15.3C14.5043 16.2833 13.6627 17.175 12.688 17.975C11.7127 18.775 10.65 19.45 9.5 20ZM8.975 13.975C9.25833 13.975 9.5 13.875 9.7 13.675C9.9 13.475 10 13.2333 10 12.95C10 12.6667 9.9 12.425 9.7 12.225C9.5 12.025 9.25833 11.925 8.975 11.925C8.69167 11.925 8.45 12.025 8.25 12.225C8.05 12.425 7.95 12.6667 7.95 12.95C7.95 13.2333 8.05 13.475 8.25 13.675C8.45 13.875 8.69167 13.975 8.975 13.975ZM8.25 10.8H9.75C9.75 10.3 9.8 9.95 9.9 9.75C10 9.55 10.3167 9.18333 10.85 8.65C11.15 8.35 11.4 8.025 11.6 7.675C11.8 7.325 11.9 6.95 11.9 6.55C11.9 5.7 11.6127 5.06233 11.038 4.637C10.4627 4.21233 9.78333 4 9 4C8.26667 4 7.65 4.204 7.15 4.612C6.65 5.02067 6.3 5.51667 6.1 6.1L7.5 6.65C7.58333 6.36667 7.74167 6.08733 7.975 5.812C8.20833 5.53733 8.55 5.4 9 5.4C9.45 5.4 9.78767 5.525 10.013 5.775C10.2377 6.025 10.35 6.3 10.35 6.6C10.35 6.88333 10.2667 7.13733 10.1 7.362C9.93333 7.58733 9.73333 7.81667 9.5 8.05C8.91667 8.55 8.56267 8.94567 8.438 9.237C8.31267 9.529 8.25 10.05 8.25 10.8Z" fill={color}/>
        </svg>
    )
}

export default SupportIcon