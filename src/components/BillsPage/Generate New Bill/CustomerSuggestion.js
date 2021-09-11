import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TextField, Typography, makeStyles, Box } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

const useStyle = makeStyles({
    custInfo: {
        height: '150px'
    },
    noInfo:{
        wordBreak: 'break-word',
        color: 'grey'
    }
})

const CustomerSuggestion = (props) => {
    const { handleCustomerInfo } = props
    const customers = useSelector(state => state.customers)
    const [ value, setValue ] = useState({})
    const [ inputValue, setInputValue ] = useState('')
    const classes = useStyle()

    const handleValueChange = (e, newValue) => {
        setValue(newValue)
        console.log(newValue)
        handleCustomerInfo(newValue)
    }

    const handleInputChange = (e, newInputValue) => {
        setInputValue(newInputValue)
        console.log(newInputValue)
    }

    return (
        <>
            <Autocomplete 
                value={value}
                onChange={handleValueChange}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                options={customers}
                getOptionLabel={option => Object.keys(option).length>0 ? `${option.mobile} - ${option.name}` : ''}
                renderInput={(params) => <TextField {...params} margin='dense' label='search customer' variant='outlined' />}
            />

            {
                (value !== null && Object.keys(value).length>0) ? (
                    <Box className={classes.custInfo} display='flex' flexDirection='column' justifyContent='center'>
                        <Typography variant='body1'><strong>Name: </strong>{value.name}</Typography>
                        <Typography variant='body1'><strong>Email: </strong>{value.email}</Typography>
                        <Typography variant='body1'><strong>Mobile: </strong>{value.mobile}</Typography>
                    </Box>
                ) : (
                    <Box className={classes.custInfo} display='flex' flexDirection='column' justifyContent='center'>
                        <Typography className={classes.noInfo} variant='body1'>Enter mobile number of customer to display details</Typography>
                    </Box>
                )
            }

        </>
    )
}

export default CustomerSuggestion