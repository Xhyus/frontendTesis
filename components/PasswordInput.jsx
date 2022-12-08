import React from 'react'
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const PasswordInput = ({ id, label, name, placeholder, show, handleChange, handleClick, enterKeyHandler }) => {
    return (
        <FormControl id={id}>
            <FormLabel>{label}</FormLabel>
            <InputGroup size='md' onKeyDown={enterKeyHandler}>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder={placeholder}
                    name={name}
                    onChange={handleChange}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
    )
}

export default PasswordInput