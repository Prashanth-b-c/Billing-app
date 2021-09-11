import React from 'react'
import { Typography } from '@material-ui/core'

const BillDetail = (props) => {
    const { id, customer, bill } = props

    return (
        <>
            <Typography variant='h6'><strong>Order ID:</strong> {id}</Typography>
            <Typography variant='h6'><strong>Customer Name:</strong> {customer.name}</Typography>
            <Typography variant='h6'><strong>{`Order date & time`}:</strong> {bill.createdAt}</Typography>
            <Typography variant='h6'><strong>Total Amount of purchase:</strong> {bill.total}</Typography>
        </>
    )
}

export default BillDetail