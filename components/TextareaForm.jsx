import { FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import FormikError from './FormikError'

const TextareaForm = ({ label, name, placeholder, type, onChange, onBlur, value, touched, errors }) => {
    console.log(name)
    console.log(value)
    return (
        <>
            <FormControl id={name} mt={5}>
                <FormLabel>{label}</FormLabel>
                <Textarea w={"full"} type={type} placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} value={value} />
            </FormControl>
            <FormikError touched={touched.description} message={errors.description} />
        </>
    )
}

export default TextareaForm