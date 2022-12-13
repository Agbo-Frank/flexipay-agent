import { TitlePage, Wrapper } from "../../components/StyleComponents"
import {DashboardWrapper} from "../../components/layout"
import { CartIcon, SearchIcon } from "../../components/icons";
// import { useLazyGetOrderQuery, } from "../../redux/slice/order";
import { memo, useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
// import { IOrder } from "../../interface"
// import OrderDetails from "./orderDetails"
// import OrderItem from "./OrderItem"
import { Empty } from "../../components/layout";
import { formatString } from "../../utils";
import UserItem from "./UserItem";

export function Users(){
    const [page, setPage] = useState(0)
    return(
        <DashboardWrapper>
            <div>
                <TitlePage>Users List</TitlePage>
                <Wrapper styles="flex justify-between items-center">
                    <div className="rounded-lg border border-primary-blue py-2 px-3 flex justify-between">
                        <input type='search' placeholder="Search" className="text-sm" 
                        // onChange={({target:{value}})=>handleFilter(value)}
                        />
                        <SearchIcon color="#E8E5FF" size="18" />
                    </div>
                </Wrapper>

                <div>
                        {/* {
                            loading || (orders && orders.length > 0) ?  */}
                            <div>
                                <TableContainer className="bg-white rounded-lg mt-3" sx={{ maxHeight: 500 }}>
                                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="order table">
                                        <TableHead>
                                            <TableRow className="text-[#545362]">
                                                <TableCell sx={{color: '#545362', fontSize: 15.5}}>Name</TableCell>
                                                <TableCell sx={{color: '#545362', fontSize: 15.5}}>Sign up Date</TableCell>
                                                {/* <TableCell sx={{color: '#545362', fontSize: 15.5}}>Actions</TableCell> */}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* {
                                                    orders?.map((order: any, idx: any) => <OrderItem order={order} key={idx} />)
                                            } */}
                                            <UserItem />
                                            <UserItem />
                                            <UserItem />
                                            <UserItem />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[15]}
                                    component="div"
                                    count={20}
                                    rowsPerPage={15}
                                    page={page}
                                    onPageChange={(e, page) => setPage(page)}
                                    className="bg-white"
                                />
                            </div>
                            {/* <Wrapper styles="grid place-items-center">
                                <Empty 
                                    button={null}
                                        // <Button
                                        //     color="secondary"
                                        //     variant="contained"
                                        //     startIcon={<CartIcon color="white" size="16"/>}
                                        //     // onClick={() => setOpen(state => ({...state, fundWallet: true}))}
                                        //     size="large"
                                        // >
                                        //     Fund Wallet
                                        // </Button>
                                    Icon={CartIcon} 
                                    title="No order" 
                                    message="You have no order yet!" 
                                />
                            </Wrapper> */}
                        {/* } */}
                    
                </div>
            
            </div>
        </DashboardWrapper>
    )
}

export default memo(Users)