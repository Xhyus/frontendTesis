import React from 'react'
import { FormControl, FormLabel, Input, Tooltip } from '@chakra-ui/react'

const UpdateInput = ({ label, handleChange, handleBlur, name, type, placeHolder, values }) => {
    console.log(values)
    return (
        <FormControl isRequired py={3}>
            <FormLabel>{label}</FormLabel>
            <Tooltip label={placeHolder} aria-label={placeHolder}>
                <Input type={type} name={name} onChange={handleChange} value={values} onBlur={handleBlur} placeholder={placeHolder} />
            </Tooltip>
        </FormControl>
    )
}

export default UpdateInput