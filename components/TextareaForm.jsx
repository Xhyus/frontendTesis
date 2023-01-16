import { FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import FormikError from './FormikError'

const TextareaForm = ({ label, name, placeholder, type, onChange, onBlur, value, touched, errors }) => {
    return (
        <>
            <FormControl id={name} mt={3}>
                <FormLabel>{label}</FormLabel>
                <Textarea w={"full"} type={type} placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} value={value} />
            </FormControl>
            {touched && errors && (
                <FormikError error={errors} />
            )}
        </>
    )
}

export default TextareaForm