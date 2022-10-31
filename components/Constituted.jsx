import { Heading, HStack, Button, Stack } from '@chakra-ui/react';
import { Formik } from 'formik';
import FormInput from './FormInput';
import FormikError from './FormikError';
import constitutedValidation from '../utils/constitutedValidation';

const Constituted = ({ setStep, company, setCompany }) => {
    return (
        <Formik
            initialValues={company}
            // validationSchema={constitutedValidation}
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
                    <Heading as="h2" size="lg" mb={4} color="white">Datos de la empresa</Heading>
                    <FormInput label="Nombre de la empresa" handleChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Estudio Fragua" />
                    {touched.name && errors.name && (
                        <FormikError error={errors.name} />
                    )}
                    <FormInput label="Razón social" handleChange={handleChange} values={values.socialReason} handleBlur={handleBlur} name="socialReason" type="text" placeHolder="Ej: Restaurantes McDonald's S.A." />
                    {touched.socialReason && errors.socialReason && (
                        <FormikError error={errors.socialReason} />
                    )}
                    <FormInput label="Email" handleChange={handleChange} values={values.email} handleBlur={handleBlur} name="email" type="email" placeHolder="Ej: Correo@gmail.cl" />
                    {touched.email && errors.email && (
                        <FormikError error={errors.email} />
                    )}
                    <HStack>
                        <Stack w={'full'}>
                            <FormInput label="RUT empresa" handleChange={handleChange} values={values.rut} handleBlur={handleBlur} name="rut" type="text" placeHolder="Ej: 11.111.111-1" />
                        </Stack>
                        <Stack w={'full'}>
                            <FormInput label="Teléfono" handleChange={handleChange} values={values.phone} handleBlur={handleBlur} name="phone" type="text" placeHolder="Ej: +569 1234 5678" />
                        </Stack>
                    </HStack>
                    <HStack>
                        {touched.rut && errors.rut && (
                            <FormikError error={errors.rut} />
                        )}
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

export default Constituted