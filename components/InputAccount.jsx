import { FormControl, FormLabel, Input } from '@chakra-ui/react'

const InputAccount = ({ name, label, placeholder, handlechange, type, enterKeyHandler }) => {
    return (
        <FormControl id={name} isRequired my={2}>
            <FormLabel>{label}</FormLabel>
            <Input type={type} placeholder={placeholder} onChange={handlechange} name={name} onKeyDown={enterKeyHandler} />
        </FormControl>
    )
}

export default InputAccount