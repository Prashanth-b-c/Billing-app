import { Button, TextField, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asyncAddProducts, asyncUpdateProducts } from '../../action/productAction'

const useStyle = makeStyles({
    form:{
        display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    nameField: {
        width: '45vw',
        marginRight:"10px"
    },
    priceField: {
        width: '25vw',
        marginRight:"10px"
    },
    button: {
        display: 'flex',
        width: '13vw',
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    addBtn: {
        width: '6vw',
        height: '40px',
        marginTop: '7px'
    },
    cancelBtn: {
        width: '6vw',
        height: '40px',
        marginTop: '7px'
    }
})

const ProductForm = (props) => {
    const { name: prodName, price: prodPrice, _id, resetUpdateProd } = props
    const [ name, setName ] = useState(prodName ? prodName : '')
    const [ price, setPrice ] = useState(prodPrice ? prodPrice : '')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}
    const dispatch = useDispatch()
    const classes = useStyle()

    const handleChange = (e) => {
        if(e.target.name === 'name') {
            setName(e.target.value)
        } else if(e.target.name === 'price' && (Number(e.target.value) || e.target.value === '')) {
            setPrice(e.target.value)
        }
    }

    const validate = () => {
        if(name.length === 0) {
            errors.name = "product name can't be blank"
        }
        if(price.length === 0) {
            errors.price = "enter valid amount"
        }
        setFormErrors(errors)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validate()
        if(Object.keys(errors).length === 0) {
            const formData = {
                name: name[0].toUpperCase() + name.slice(1),
                price: price
            }
            if(_id) {
                dispatch(asyncUpdateProducts(_id, formData, resetUpdateProd))
            } else {
                dispatch(asyncAddProducts(formData, resetForm))
            }
        }
    }

    const resetForm = () => {
        setName('')
        setPrice('')
    }

    return (
        <form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
                className={classes.nameField}
                name='name'
                label='Product Name'
                value={name}
                onChange={handleChange}
                error={formErrors.name ? true : false}
                helperText={formErrors.name ? formErrors.name : null}
                variant='outlined'
                margin='dense'
            />
            <TextField
                className={classes.priceField}
                name='price'
                label='Price'
                value={price}
                onChange={handleChange}
                error={formErrors.price ? true : false}
                helperText={formErrors.price ? formErrors.price : null}
                variant='outlined'
                margin='dense'
            />
            {
                _id ? (
                    <div className={classes.button}>
                        <Button 
                            className={classes.addBtn}
                            type='submit'
                            variant='contained'
                            color='primary'
                        >
                            update    
                        </Button> 
                        <Button
                            className={classes.cancelBtn}
                            variant='contained'
                            color='secondary'
                            onClick={() => resetUpdateProd()}
                        >
                            cancel
                        </Button>
                    </div>
                ) : (
                    <div className={classes.button}>
                        <Button 
                            className={classes.addBtn}
                            type='submit'
                            variant='contained'
                            color='primary'
                        >
                            add    
                        </Button> 
                        {
                            (name.length > 0 || price.length> 0) && (
                                <Button
                                className={classes.cancelBtn}
                                    variant='contained'
                                    color='secondary'
                                    onClick={resetForm}
                                >
                                    cancel
                                </Button>
                            )
                        }
                    </div>
                )
            }
            
        </form>
    )
}

export default ProductForm