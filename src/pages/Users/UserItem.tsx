import { TableCell, TableRow } from "@mui/material"
import { IAgentUsers } from "../../interface"
// import moment from "moment"


export function UserItem({user}: {user: IAgentUsers}){
    return (
        <TableRow hover>
            <TableCell>Agbo Francis Ekene</TableCell>
            <TableCell>05/08/2022</TableCell>
        </TableRow>
    )
}

export default UserItem