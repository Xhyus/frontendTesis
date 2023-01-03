import { FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import FormikError from './FormikError'

const TextareaForm = ({ label, name, placeholder, type, onChange, onBlur, value, touched, errors }) => {
    return (
        <>
            <FormControl id={name} mt={5} isRequired>
                <FormLabel>{label}</FormLabel>
                <Textarea w={"full"} type={type} placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} value={value.description} />
            </FormControl>
            <FormikError touched={touched.description} message={errors.description} />
        </>
    )
}

export default TextareaForm