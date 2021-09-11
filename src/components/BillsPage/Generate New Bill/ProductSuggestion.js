import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

const ProductSuggestion = (props) => {
    const { handleAddLineItem } = props
    const [ value, setValue ] = useState({})
    const [ inputValue, setInputValue ] = useState('')
    const products = useSelector(state => state.products)

    //Autocomplete related functions
    const handleValueChange = (e, newValue) => {
        setValue(newValue)
        const productData = {...newValue, quantity: 1}
        productData.subTotal = productData.quantity * productData.price
        if(newValue) {
            handleAddLineItem(productData)
            resetSuggestion()
        }
    }

    const handleInputChange = (e, newInputValue) => {
        setInputValue(newInputValue)
        console.log('input value ', newInputValue)
    }

    const resetSuggestion = () => {
        setValue(null)
        setInputValue('')
    }

    return (
        <Autocomplete 
            value={value}
            onChange={handleValueChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={products}
            getOptionLabel={option => Object.keys(option).length>0 ? `${option.name} - Rs.${option.price}` : ''}
            renderInput={(params) => <TextField {...params} margin='dense' label='search product to add' variant='outlined' />}
        />
    )
}

export default ProductSuggestion