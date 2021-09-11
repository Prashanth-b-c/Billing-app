import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core'
import { asyncDeleteCustomer } from '../../action/customerAction'

const useStyle = makeStyles({
    table: {
        // position: 'fixed',
        // width: '90vw',
        // marginTop: '5px',
        maxHeight: '380px'
    },
    nameHeader:{
        width: '25%'
    },
    emailColumn:{
        width: '25%'
    },
    tableBtns:{
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-evenly'
    },
    tableHeader: {
        backgroundColor: 'black',
        color: 'white'
    },
    headerName: {
        color:'white'
    },
    viewLink: {
        textDecoration: 'none'
    }
})

const CustomerTable = (props) => {
    const { handleUpdateCustomer, customers, resetSearch, handleViewCustomer } = props
    const dispatch = useDispatch()
    const classes = useStyle()

    return (
        <TableContainer component={Paper} className={classes.table} >
            <Table stickyHeader size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeader} align='center'>ID</TableCell>
                        <TableCell className={`${classes.nameColumn} ${classes.tableHeader}`} align='center'>Customer Name</TableCell>
                        <TableCell className={classes.tableHeader} align='center'>Mobile</TableCell>
                        <TableCell className={`${classes.emailColumn} ${classes.tableHeader}`} align='center'>Email</TableCell>
                        <TableCell className={classes.tableHeader} align='center'>View</TableCell>
                        <TableCell className={classes.tableHeader} align='center'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        customers.map((cust, index) => {
                            return (
                                <TableRow hover key={cust._id}>
                                    <TableCell align='center'> {index + 1} </TableCell>
                                    <TableCell align='center'> {cust.name} </TableCell>
                                    <TableCell align='center'> {cust.mobile} </TableCell>
                                    <TableCell align='center'> {cust.email} </TableCell>
                                    <TableCell align='center'> 
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={() => handleViewCustomer(cust._id)}   
                                            >
                                                View
                                            </Button>
                                    </TableCell>
                                    <TableCell className={classes.tableBtns} align='center'> 
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={() => {
                                                    handleUpdateCustomer(cust)
                                                    resetSearch()
                                                }}
                                            >
                                                Update
                                            </Button> 
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                onClick={() => {
                                                    dispatch(asyncDeleteCustomer(cust._id))
                                                    resetSearch()
                                                }}
                                            >
                                                Remove
                                            </Button> 
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

export default CustomerTable