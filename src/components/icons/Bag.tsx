import {Iicon} from "../../interface";

export function BagIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 5V3C10 2.20435 9.68393 1.44129 9.12132 0.87868C8.55871 0.316071 7.79565 0 7 0C6.20435 0 5.44129 0.316071 4.87868 0.87868C4.31607 1.44129 4 2.20435 4 3V5H0V19H14V5H10ZM6 3C6 2.73478 6.10536 2.48043 6.29289 2.29289C6.48043 2.10536 6.73478 2 7 2C7.26522 2 7.51957 2.10536 7.70711 2.29289C7.89464 2.48043 8 2.73478 8 3V5H6V3ZM12 17H2V7H4V9H6V7H8V9H10V7H12V17Z" fill={color}/>
    </svg>
  );
}

export default BagIcon;