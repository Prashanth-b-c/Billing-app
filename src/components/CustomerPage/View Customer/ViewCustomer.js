import { Container, IconButton, makeStyles } from '@material-ui/core'
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom'
import CustomerStats from './CustomerStats';
import CustomerOrders from './CustomerOrders';

const useStyle = makeStyles({
    container: {
        width: '90vw',
        padding: '2vh 1vw'
    }
})

const ViewCustomer = (props) => {
    const classes = useStyle()
    const bills = useSelector(state => state.bills)
    const [ customerBills, setCustomerBills ] = useState([])
    const id = props.match.params.id

    const getBills = useCallback((id) => {
        const custBills = bills.filter(bill => bill.customer === id)
        handleCustomerBills(custBills)
    }, [bills])

    useEffect(() => {
        getBills(id)
    }, [getBills, id])

    const handleCustomerBills = (data) => {
        setCustomerBills(data)
    }

    return (
        <Container className={classes.container}>
            <Link to='/customers'>
                <IconButton size='medium'>
                    <ArrowBackIcon />
                </IconButton>
            </Link>
            <CustomerStats id={props.match.params.id} customerBills={customerBills} />
            <CustomerOrders customerBills={customerBills} />
        </Container>
    )
}

export default ViewCustomer