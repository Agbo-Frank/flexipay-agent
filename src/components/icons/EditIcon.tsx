import {Iicon} from "../../interface";

export function EditIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3316 0.0129191C20.1298 -0.0994647 21.9029 0.524889 23.2391 1.74862C24.4628 3.08474 25.0872 4.85791 24.9873 6.66853V18.3315C25.0997 20.1421 24.4628 21.9153 23.2516 23.2514C21.9154 24.4751 20.1298 25.0995 18.3316 24.9871H6.66859C4.85795 25.0995 3.08477 24.4751 1.74864 23.2514C0.524894 21.9153 -0.0994655 20.1421 0.0129192 18.3315V6.66853C-0.0994655 4.85791 0.524894 3.08474 1.74864 1.74862C3.08477 0.524889 4.85795 -0.0994647 6.66859 0.0129191H18.3316ZM18.0069 5.71951C17.2327 4.94532 15.984 4.94532 15.2098 5.71951L14.3732 6.56864C14.2483 6.69351 14.2483 6.90579 14.3732 7.03066C14.3732 7.03066 14.3977 7.05502 14.4413 7.09839L14.7485 7.40386C14.9261 7.58063 15.1479 7.80139 15.3706 8.02338L16.1257 8.77813C16.2833 8.9364 16.3878 9.04247 16.3961 9.05357C16.5335 9.20341 16.6209 9.4032 16.6209 9.62797C16.6209 10.0775 16.2587 10.4521 15.7967 10.4521C15.5844 10.4521 15.3846 10.3647 15.2473 10.2274L13.1619 8.1545C13.062 8.0546 12.8872 8.0546 12.7873 8.1545L6.83092 14.1108C6.41884 14.5229 6.18159 15.0723 6.1691 15.6592L6.09418 18.6187C6.09418 18.781 6.14413 18.9308 6.25651 19.0432C6.36889 19.1556 6.51874 19.218 6.68107 19.218H9.61556C10.2149 19.218 10.7894 18.9808 11.2264 18.5562L19.6303 10.1275C20.392 9.35326 20.392 8.10455 19.6303 7.34284L18.0069 5.71951Z" fill={color}/>
    </svg>
  );
}

export default EditIcon;