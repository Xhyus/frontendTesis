import { FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const PasswordInput = ({ id, label, name, placeholder, show, handleChange, handleClick, enterKeyHandler }) => {
    return (
        <FormControl id={id} pb={3}>
            <FormLabel>{label}</FormLabel>
            <InputGroup size='md' onKeyDown={enterKeyHandler}>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder={placeholder}
                    name={name}
                    onChange={handleChange}
                />
                <InputRightElement width='4.5rem' pr={1}>
                    <Icon as={show ? FaRegEyeSlash : FaRegEye} _hover={{ color: "cyan" }} onClick={handleClick} />
                </InputRightElement>
            </InputGroup>
        </FormControl>
    )
}

export default PasswordInput