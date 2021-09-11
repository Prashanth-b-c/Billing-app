import { Container, Typography, makeStyles } from '@material-ui/core'
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

const EditCustomer = (props) => {
    const { updateCust, resetUpdateCust } = props
    const classes = useStyle()

    return (
        <Container className={classes.container}>
            <Typography className={classes.title} variant='h5'>Edit Customer</Typography>
            <CustomerForm 
                name={updateCust.name}
                mobile={updateCust.mobile}
                email={updateCust.email}
                _id={updateCust._id}
                resetUpdateCust={resetUpdateCust}
            />
        </Container>
    )
}

export default EditCustomer