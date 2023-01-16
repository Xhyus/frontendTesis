import { FormControl, FormLabel, Input, Tooltip, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react'
import FormikError from './FormikError';

const FormInput = ({ label, onChange, handleBlur, name, type, placeHolder, values, touched, errors }) => {
    if (label === 'Teléfono') {
        return (
            <>
                <FormControl py={3}>
                    <FormLabel>{label}</FormLabel>
                    <Tooltip label={placeHolder} aria-label={label}>
                        <InputGroup>
                            <InputLeftAddon>
                                +569
                            </InputLeftAddon>
                            <Input type={type} placeholder={placeHolder} maxLength={8} onChange={onChange} onBlur={handleBlur} name={name} value={values} />
                        </InputGroup>
                    </Tooltip>
                </FormControl>
            </>
        )
    }
    return (
        <>
            <FormControl py={3}>
                <FormLabel>{label}</FormLabel>
                <Tooltip label={placeHolder} aria-label={placeHolder}>
                    <Input type={type} name={name} onChange={onChange} value={values} onBlur={handleBlur} placeholder={placeHolder} />
                </Tooltip>
            </FormControl>
            {touched && errors && (
                <FormikError error={errors} />
            )}
        </>
    )
}

export default FormInput