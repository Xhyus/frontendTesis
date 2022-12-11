import React from 'react'
import { FormControl, FormLabel, Input, Tooltip, InputGroup, InputLeftAddon } from '@chakra-ui/react'

const FormInput = ({ label, onChange, handleBlur, name, type, placeHolder, values }) => {
    if (label === 'Teléfono') {
        return (
            <FormControl isRequired py={3}>
                <FormLabel>{label}</FormLabel>
                <Tooltip label={placeHolder} aria-label={label}>
                    <InputGroup>
                        <InputLeftAddon children='+569' />
                        <Input type={type} placeholder={placeHolder} maxLength={8} onChange={onChange} onBlur={handleBlur} name={name} value={values} />
                    </InputGroup>
                </Tooltip>
            </FormControl>
        )
    }
    return (
        <FormControl isRequired py={3}>
            <FormLabel>{label}</FormLabel>
            <Tooltip label={placeHolder} aria-label={placeHolder}>
                <Input type={type} name={name} onChange={onChange} value={values} onBlur={handleBlur} placeholder={placeHolder} />
            </Tooltip>
        </FormControl>
    )
}

export default FormInput