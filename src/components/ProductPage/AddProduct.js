import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import ProductForm from './ProductForm'

const useStyle = makeStyles({
    title:{
        fontWeight:700
    },
    container:{
        padding: '10px 0'
    }
})

const AddProduct = (props) => {
    const classes = useStyle()

    return (
        <Container className={classes.container}>
            <Typography className={classes.title} variant='h5'>Add Product</Typography>
            <ProductForm />
        </Container>
    )
}

export default AddProduct