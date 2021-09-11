import { Container, IconButton, makeStyles, Typography, Box, Tooltip } from '@material-ui/core'
import React, { useState, useEffect, useCallback } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetBillDetail } from '../../../action/billsAction';
import BillDetail from './BillDetail';
import BillItemtable from './BillItemTable';
import PrintBill from './PrintBill';

const useStyle = makeStyles({
    container: {
        width: '50vw',
        padding: '2vh 1vw'
    },
    viewBtn: {
        textDecoration: 'none'
    }
})

const BillView = (props) => {
    const classes = useStyle()
    const { id } = props.match.params
    const customers = useSelector(state => state.customers)
    const [ billDetails, setBillDetails ] = useState({})
    const [ customerDetails, setCustomerDetails ] = useState({})
    const dispatch = useDispatch()

    const getCustomerDetail = useCallback((id) => {
        const customer = customers.find(cust => cust._id === id)
        setCustomerDetails(customer)
    }, [customers])

    const handleBillDetails = useCallback((data) => {
        setBillDetails(data)
        getCustomerDetail(data.customer)
    }, [getCustomerDetail])
    
    useEffect(() => {
        dispatch(asyncGetBillDetail(id, handleBillDetails))
    }, [dispatch, id, handleBillDetails])

    return (
        <Container className={classes.container}>
            <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Tooltip title='Go back to bills page'>
                    <Link to='/bills'>
                        <IconButton size='medium'>
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                </Tooltip>
                {
                    (Object.keys(billDetails).length > 0 && Object.keys(customerDetails).length > 0) && (
                        <PrintBill 
                            id={id} 
                            bill={billDetails} 
                            customer={customerDetails} 
                            items={billDetails.lineItems} 
                        />
                    )
                }
            </Box>
            <Typography variant='h5' align='center'><strong>Bill Invoice</strong></Typography>
            {
                (Object.keys(billDetails).length > 0 && Object.keys(customerDetails).length > 0) && (
                    <>
                        <BillDetail id={id} bill={billDetails} customer={customerDetails} />
                        <BillItemtable items={billDetails.lineItems} total={billDetails.total} />
                    </>
                )
            }
        </Container>
    )
}

export default BillView