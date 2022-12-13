import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Wrapper } from "../../components/StyleComponents"
import { Empty } from "../../components/layout"
import { CartIcon } from "../../components/icons"
import UserItem from "../Users/UserItem"



export function NewUsers(){
    let [page, setPage] = useState(0)
    return(
        <div>
            <TableContainer className="bg-white rounded-lg mt-3" sx={{ maxHeight: 440 }}>
                        {/* {
                            loading || (orders && orders.length > 0) ?  */}
                            <div>
                                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="order table">
                                    <TableHead>
                                        <TableRow className="text-[#545362]">
                                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Name</TableCell>
                                            <TableCell sx={{color: '#545362', fontSize: 15.5}}>Sign up Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {
                                                orders?.map((order: any, idx: any) => <UserItem order={order} key={idx} />)
                                        } */}
                                        <UserItem />
                                        <UserItem />
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
                            </div> 
                            {/* <Wrapper styles="grid place-items-center">
                                <Empty 
                                    button={
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            startIcon={<CartIcon color="white" size="16"/>}
                                            // onClick={() => setOpen(state => ({...state, fundWallet: true}))}
                                            size="large"
                                        >
                                            Fund Wallet
                                        </Button>
                                    } 
                                    Icon={CartIcon} 
                                    title="No order" 
                                    message="You have no order yet!" 
                                />
                            </Wrapper>
                        } */}
                    </TableContainer>
        </div>
    )
}

export default NewUsers;