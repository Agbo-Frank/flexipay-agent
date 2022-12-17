import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { CopyIcon, UserIcon } from "../../components/icons"
import { Empty } from "../../components/layout"
import { Wrapper } from "../../components/StyleComponents"
import { IAgentUsers } from "../../interface"
import { useLazyGetAgentUsersQuery } from "../../redux/api"
import UserItem from "../Users/UserItem"



export function NewUsers(){
    let [page, setPage] = useState(0)
    const [getAgentUsers, {pagination, users, isLoading}] = useLazyGetAgentUsersQuery({
        selectFromResult: ({data, isLoading}) => ({
            pagination: data?.result,
            users: data?.result.data,
            isLoading
        })
    })
    useEffect(() => {
        getAgentUsers({quantity: 5})
    }, [])
    return(
        <div>
            <TableContainer className="bg-white rounded-lg mt-3" sx={{ maxHeight: 440 }}>
                {
                    isLoading || (users && users.length > 0) ? 
                    <div>
                        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="order table">
                            <TableHead>
                                <TableRow className="text-[#545362]">
                                    <TableCell sx={{color: '#545362', fontSize: 15.5}}>Name</TableCell>
                                    <TableCell sx={{color: '#545362', fontSize: 15.5}}>Sign up Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                        users?.map((user: IAgentUsers, idx: any) => <UserItem user={user} key={idx} />)
                                }
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[15]}
                            component="div"
                            count={100}
                            rowsPerPage={15}
                            page={page}
                            onPageChange={(e, page) => setPage(page)}
                            className="bg-white"
                        />
                    </div> :
                    <Wrapper styles="grid place-items-center">
                        <Empty
                            button={null} 
                            Icon={UserIcon} 
                            title="You have not referred any users yet" 
                            message="You have not referred any users yet, click on the button on the header to copy your referral code" 
                        />
                    </Wrapper>
                }
            </TableContainer>
        </div>
    )
}

export default NewUsers;