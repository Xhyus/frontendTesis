import { Heading, HStack, Button, Stack, FormControl, Input, Tooltip, FormLabel } from '@chakra-ui/react';
import { Formik } from 'formik';
import FormInput from './FormInput';
import FormikError from './FormikError';
import unconstitutedValidation from '../utils/unconstitutedValidation';
import { formatRut } from 'rutlib';


const UnConstituted = ({ setStep, setCompany, company, companyRUT, setCompanyRUT }) => {

    const handleChangeRUT = (e) => {
        if (e.target.value === '-') {
            setCompanyRUT('')
        }
        if (e.target.value.length > 0 && e.target.value !== '-') {
            setCompanyRUT(formatRut(e.target.value))
        }
    }
    return (
        <Formik
            initialValues={company}
            validationSchema={unconstitutedValidation}
            onSubmit={(values) => {
                setCompany(values)
                setStep(2)
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit} id="form" >
                    <Heading as="h2" size="lg" mb={4} color="white">Datos del cliente</Heading>
                    <FormInput label="Nombre del cliente" handleChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Juan Gomez" />
                    {touched.name && errors.name && (
                        <FormikError error={errors.name} />
                    )}
                    <FormInput label="Email" handleChange={handleChange} values={values.email} handleBlur={handleBlur} name="email" type="email" placeHolder="Ej: Correo@gmail.cl" />
                    {touched.email && errors.email && (
                        <FormikError error={errors.email} />
                    )}
                    <HStack>
                        <Stack w={'full'}>
                            <FormControl isRequired py={3}>
                                <FormLabel>RUT de Empresa</FormLabel>
                                <Tooltip label={"Ingrese RUT"} aria-label={"Ingrese RUT"}>
                                    <Input type={"text"} name={companyRUT} maxLength={12} onChange={handleChangeRUT} value={companyRUT} placeholder={"11.111.111-1"} />
                                </Tooltip>
                            </FormControl>
                        </Stack>
                        <Stack w={'full'}>
                            <FormInput label="Teléfono" handleChange={handleChange} values={values.phone} handleBlur={handleBlur} name="phone" type="text" placeHolder="Ej: 12345678" />
                        </Stack>
                    </HStack>
                    <HStack>
                        {touched.phone && errors.phone && (
                            <FormikError error={errors.phone} />
                        )}
                    </HStack>
                    <FormInput label="Dirección" handleChange={handleChange} values={values.address} handleBlur={handleBlur} name="address" type="text" placeHolder="Ej: Av. Siempre Viva 123" />
                    {touched.address && errors.address && (
                        <FormikError error={errors.address} />
                    )}
                    <HStack align={"center"} justify={"center"} mt={5} pb={"10%"}>
                        <Button colorScheme={"green"} type="submit" w="full"> Siguiente paso </Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default UnConstituted