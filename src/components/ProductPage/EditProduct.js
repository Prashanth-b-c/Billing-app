import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import ProductForm from './ProductForm'

const useStyle = makeStyles({
    title:{
        fontWeight:700
    },
    container: {
        padding: '10px 0'
    }
})

const EditProduct = (props) => {
    const { updateProd, resetUpdateProd } = props
    const classes = useStyle()

    return (
        <Container className={classes.container}>
            <Typography className={classes.title} variant='h5'>Edit Product</Typography>
            <ProductForm
                name={updateProd.name}
                price={updateProd.price}     
                _id={updateProd._id}  
                resetUpdateProd={resetUpdateProd}     
            />
        </Container>
    )
}

export default EditProduct