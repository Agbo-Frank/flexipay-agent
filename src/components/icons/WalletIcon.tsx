import {Iicon} from "../../interface";

export function WalletIcon({ size, color, line = false}: Iicon): JSX.Element {
  if(line){
    return (
      <svg width={size} height={size} viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 17.25C5 15.5924 5.65848 14.0027 6.83058 12.8306C8.00269 11.6585 9.5924 11 11.25 11H48.75C50.4076 11 51.9973 11.6585 53.1694 12.8306C54.3415 14.0027 55 15.5924 55 17.25V32.875H5V17.25ZM40.9375 20.375C40.5231 20.375 40.1257 20.5396 39.8326 20.8326C39.5396 21.1257 39.375 21.5231 39.375 21.9375V25.0625C39.375 25.4769 39.5396 25.8743 39.8326 26.1674C40.1257 26.4604 40.5231 26.625 40.9375 26.625H47.1875C47.6019 26.625 47.9993 26.4604 48.2924 26.1674C48.5854 25.8743 48.75 25.4769 48.75 25.0625V21.9375C48.75 21.5231 48.5854 21.1257 48.2924 20.8326C47.9993 20.5396 47.6019 20.375 47.1875 20.375H40.9375ZM5 39.125V42.25C5 43.9076 5.65848 45.4973 6.83058 46.6694C8.00269 47.8415 9.5924 48.5 11.25 48.5H48.75C50.4076 48.5 51.9973 47.8415 53.1694 46.6694C54.3415 45.4973 55 43.9076 55 42.25V39.125H5Z" fill={color}/>
          <line x1="60" y1="2.12132" x2="2.12132" y2="60" stroke={color} stroke-width="3" stroke-linecap="round"/>
      </svg> 
    )
  }
  else{
    return(
      <svg width={size} height={size} viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.5 26C31.1022 26 30.7206 26.158 30.4393 26.4393C30.158 26.7206 30 27.1022 30 27.5C30 27.8978 30.158 28.2794 30.4393 28.5607C30.7206 28.842 31.1022 29 31.5 29H36.5C36.8978 29 37.2794 28.842 37.5607 28.5607C37.842 28.2794 38 27.8978 38 27.5C38 27.1022 37.842 26.7206 37.5607 26.4393C37.2794 26.158 36.8978 26 36.5 26H31.5ZM2.62164e-06 5.5C2.62164e-06 4.04131 0.579465 2.64236 1.61092 1.61091C2.64237 0.579463 4.04131 0 5.5 0H32.5C33.9587 0 35.3576 0.579463 36.3891 1.61091C37.4205 2.64236 38 4.04131 38 5.5V8.016C39.8985 8.14285 41.6777 8.9865 42.9775 10.3761C44.2772 11.7657 45.0002 13.5973 45 15.5V36.5C45 38.4891 44.2098 40.3968 42.8033 41.8033C41.3968 43.2098 39.4891 44 37.5 44H7.508C5.51888 44 3.61122 43.2098 2.2047 41.8033C0.798179 40.3968 0.00800252 38.4891 0.00800252 36.5V15.5H2.62164e-06V6H0.0220025C0.00718126 5.83375 -0.00015932 5.66691 2.62164e-06 5.5ZM37.5 11H3.008V36.5C3.008 37.6935 3.48211 38.8381 4.32602 39.682C5.16994 40.5259 6.31453 41 7.508 41H37.5C38.6935 41 39.8381 40.5259 40.682 39.682C41.5259 38.8381 42 37.6935 42 36.5V15.5C42 14.3065 41.5259 13.1619 40.682 12.318C39.8381 11.4741 38.6935 11 37.5 11ZM35 5.5C35 4.12 33.88 3 32.5 3H5.5C4.83696 3 4.20108 3.26339 3.73224 3.73223C3.26339 4.20107 3 4.83696 3 5.5C3 6.16304 3.26339 6.79893 3.73224 7.26777C4.20108 7.73661 4.83696 8 5.5 8H35V5.5Z" fill={color}/>
      </svg>
    )
  }
}

export default WalletIcon;