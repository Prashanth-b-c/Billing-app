import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import CustomerForm from './CustomerForm'

const useStyle = makeStyles({
    title:{
        fontWeight:700
    },
    container:{
        padding: '10px 0'
    }
})

const AddCustomer = (props) => {
    const classes = useStyle()

    return (
        <Container className={classes.container}>
            <Typography className={classes.title} variant='h5'>Add Customer</Typography>
            <CustomerForm />
        </Container>
    )
}

export default AddCustomer