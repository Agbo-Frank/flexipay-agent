import {Iicon} from "../../interface";
import useMediaQuery from '@mui/material/useMediaQuery';

interface IEmptyProps {
    Icon: React.FC<Iicon>;
    message: string;
    title: string;
    button: any
}

export function Empty({message, title, Icon, button}: IEmptyProps){
    const matches = useMediaQuery('(min-width:640px)'); 
    return(
        <div className="sm:w-fp-500 text-center rounded-xl py-6 flex justify-center flex-col border border-solid border-grey-100 mx-auto my-4 sm:my-10 sm:px-10 space-y-3 sm:space-y-5">
            <div className="mx-auto sm:my-3">
                <Icon line size={matches ? "65" : "45"} color="#E8E5FF"/>
            </div>
    
            <p className="text-lg font-medium capitalize">{title}</p>
            <p className="text-[#545362] font-light my-2 text-sm">{message}</p>
            <div>{button}</div>
        </div>
    )
}

export default Empty