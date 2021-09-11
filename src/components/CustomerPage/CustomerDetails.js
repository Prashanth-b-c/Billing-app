import { Typography, Paper, Button, makeStyles, Box, Divider } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {  asyncCustomerDetail } from '../../action/customerAction'
import moment from 'moment'

const useStyle= makeStyles({
    container:{
        display: 'grid',
        placeItems: 'center',
        width: '325px',
        height: "230px",
        padding: '10px'
    },
    content:{
        marginTop: '30px'
    },
    noCustomer: {
        width: '150px',
        wordBreak: 'break-word',
        color: 'grey'
    },
    detailsTitle:{
        textAlign: 'center',
        fontWeight: 600
    }
})

const CustomerDetails = (props) => {
    const { customerId, resetViewCustomer } = props
    const classes = useStyle()
    const [ detail, setDetail ] = useState({})
    const dispatch = useDispatch()

    const handleDetailChange = (data) => {
        setDetail(data)
    }



    const handleClose = () => {
        setDetail({})
        resetViewCustomer()
    }

    useEffect(() => {
        if(customerId) {
            dispatch(asyncCustomerDetail(customerId, handleDetailChange))
        }
    }, [customerId, dispatch])

    return (
        <Paper className={classes.container}>
            {
                customerId ? (
                    <Box>
                        <Typography className={classes.detailsTitle} variant='h5'>Customer  Details</Typography>
                        <Divider variant='middle' />
                        <Box className={classes.content}>
                            <Typography variant='h6'>Name: {detail.name}</Typography>
                            <Typography variant='h6'>Price: {detail.mobile}</Typography>
                            <Typography variant='h6'>Email: {detail.email}</Typography>
                            <Typography variant='h6'>Added on: {detail.createdAt && moment(detail.createdAt).format('hh:mm A, DD/MM/YYYY')}</Typography>
                            <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
                                <Button
                                    variant='outlined'
                                    onClick={handleClose}
                                >
                                    close
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Typography className={classes.noCustomer} variant='h6'>select a Customer to view  details</Typography>
                )
            }
        </Paper>
    )
}

export default CustomerDetails