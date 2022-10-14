import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

const FormInput = ({ label, handleChange, handleBlur, name, type, placeHolder }) => {
    return (
        <FormControl isRequired py={3}>
            <FormLabel>{label}</FormLabel>
            <Input type={type} name={name} onChange={handleChange} onBlur={handleBlur} placeholder={placeHolder} />
        </FormControl>
    )
}

export default FormInput