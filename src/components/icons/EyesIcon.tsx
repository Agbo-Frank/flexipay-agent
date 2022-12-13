import {Iicon} from "../../interface";

export function EyesIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size}viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.00065 9.00033C10.3262 9.00033 11.4007 7.92578 11.4007 6.60026C11.4007 5.27474 10.3262 4.2002 9.00065 4.2002C7.67513 4.2002 6.60059 5.27474 6.60059 6.60026C6.60059 7.92578 7.67513 9.00033 9.00065 9.00033Z" fill={color}/>
        <path d="M17.9643 6.39618C17.2585 4.57072 16.0334 2.99205 14.4402 1.8553C12.8471 0.718554 10.9557 0.0735458 9 0C7.04425 0.0735458 5.15292 0.718554 3.55977 1.8553C1.96661 2.99205 0.741462 4.57072 0.0357458 6.39618C-0.0119153 6.52801 -0.0119153 6.67236 0.0357458 6.80419C0.741462 8.62966 1.96661 10.2083 3.55977 11.3451C5.15292 12.4818 7.04425 13.1268 9 13.2004C10.9557 13.1268 12.8471 12.4818 14.4402 11.3451C16.0334 10.2083 17.2585 8.62966 17.9643 6.80419C18.0119 6.67236 18.0119 6.52801 17.9643 6.39618V6.39618ZM9 10.5003C8.22863 10.5003 7.47458 10.2716 6.83321 9.84301C6.19184 9.41446 5.69196 8.80535 5.39677 8.09269C5.10158 7.38004 5.02434 6.59586 5.17483 5.83931C5.32532 5.08277 5.69676 4.38783 6.24221 3.84239C6.78765 3.29695 7.48258 2.9255 8.23913 2.77502C8.99567 2.62453 9.77986 2.70176 10.4925 2.99696C11.2052 3.29215 11.8143 3.79203 12.2428 4.4334C12.6714 5.07477 12.9001 5.82882 12.9001 6.60019C12.8985 7.63407 12.4871 8.62516 11.756 9.35623C11.025 10.0873 10.0339 10.4987 9 10.5003V10.5003Z" fill={color}/>
    </svg>
  );
}

export default EyesIcon;