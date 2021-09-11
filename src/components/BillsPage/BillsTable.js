import { makeStyles, Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { asyncDeleteBill } from '../../action/billsAction'
import { Link } from 'react-router-dom'

const useStyle = makeStyles({
    tableHeader: {
        backgroundColor: 'black',
        color: 'white'
    },
    table: {
       // maxHeight: 'px'
        width: '90vw',
        padding: '2vh 1vw'
    },
    viewBtn: {
        textDecoration: 'none'
    }
})

const BillsTable = (props) => {
    const dispatch = useDispatch()
    const { bills, resetSearch } = props
    const customers = useSelector(state => state.customers)
    const classes = useStyle()

    const getCustomerName = (id) => {
        if(customers.length > 0){
            const getCustomer = customers.find(cust => cust._id === id)
            return getCustomer.name
        }
    }

    return (
        <TableContainer component={Paper}  className={classes.table} >
            <Table stickyHeader size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeader} align='center'>S.No</TableCell>
                        <TableCell className={classes.tableHeader} align='center'>Order ID</TableCell>
                        <TableCell className={classes.tableHeader} align='center'>Customer Name</TableCell>
                        <TableCell className={classes.tableHeader} align='center'>{'Date & Time'}</TableCell>
                        <TableCell className={classes.tableHeader} align='center'>View/Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        bills.map((bill, index) => {
                            return (
                                <TableRow hover key={bill._id}>
                                    <TableCell align='center'> {index + 1} </TableCell>
                                    <TableCell> {bill._id} </TableCell>
                                    <TableCell> {getCustomerName(bill.customer)} </TableCell>
                                    <TableCell align='center'> {bill.createdAt && moment(bill.createdAt).format('DD/MM/YYYY, hh:mm A')} </TableCell>
                                    <TableCell align='center'> 
                                    <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
                                        <Link to={`/bills/${bill._id}`} className={classes.viewBtn} >
                                            <Button 
                                                variant='contained' 
                                                color='primary'
                                            >
                                                view
                                            </Button>
                                        </Link> 
                                        <Button 
                                            variant='contained' 
                                            color='secondary'
                                            onClick = {() => {
                                                resetSearch()
                                                dispatch(asyncDeleteBill(bill._id))
                                            }}
                                        >
                                            delete
                                        </Button>
                                    </Box>
                                            
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BillsTable