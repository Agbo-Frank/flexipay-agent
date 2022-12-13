import {Iicon} from "../../interface";

export function CopyIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.6 4.7998H1.6C0.7176 4.7998 0 5.5174 0 6.3998V14.3998C0 15.2822 0.7176 15.9998 1.6 15.9998H9.6C10.4824 15.9998 11.2 15.2822 11.2 14.3998V6.3998C11.2 5.5174 10.4824 4.7998 9.6 4.7998Z" fill={color}/>
        <path d="M14.4 0H6.40002C5.97567 0 5.56871 0.168571 5.26865 0.468629C4.96859 0.768687 4.80002 1.17565 4.80002 1.6V3.2H11.2C11.6244 3.2 12.0313 3.36857 12.3314 3.66863C12.6314 3.96869 12.8 4.37565 12.8 4.8V11.2H14.4C14.8244 11.2 15.2313 11.0314 15.5314 10.7314C15.8314 10.4313 16 10.0243 16 9.6V1.6C16 1.17565 15.8314 0.768687 15.5314 0.468629C15.2313 0.168571 14.8244 0 14.4 0Z" fill={color}/>
    </svg>
  );
}

export default CopyIcon;