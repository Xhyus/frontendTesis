import React from 'react'
import { FormControl, FormLabel, Input, Tooltip } from '@chakra-ui/react'

const FormInput = ({ label, handleChange, handleBlur, name, type, placeHolder, values }) => {
    return (
        <FormControl isRequired py={3}>
            <FormLabel>{label}</FormLabel>
            <Tooltip label={placeHolder} aria-label={placeHolder}>
                <Input type={type} name={name} onChange={handleChange} values={values} onBlur={handleBlur} placeholder={placeHolder} />
            </Tooltip>
        </FormControl>
    )
}

export default FormInput