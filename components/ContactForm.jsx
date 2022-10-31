import React from 'react'
import { Heading, HStack, Stack, Button } from '@chakra-ui/react'
import { Formik } from 'formik'
import FormikError from './FormikError'
import FormInput from './FormInput'

const ContactForm = ({ company, setStep, setContact, contact }) => {
    return (
        <Formik
            initialValues={contact}
            onSubmit={(values) => {
                console.log('Contact values: ', values)
                console.log('Company values: ', company)
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
                    <Heading as="h2" size="lg" mb={4} color="white">Datos del contacto</Heading>
                    <FormInput label="Nombre" handleChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Juan Pérez" />
                    {touched.name && errors.name && (
                        <FormikError error={errors.name} />
                    )}
                    <FormInput label="Email" handleChange={handleChange} values={values.email} handleBlur={handleBlur} name="email" type="email" placeHolder="Ej: Correo@gmail.cl" />
                    {touched.email && errors.email && (
                        <FormikError error={errors.email} />
                    )}
                    <HStack>
                        <Stack w={'full'}>
                            <FormInput label="RUT" handleChange={handleChange} values={values.rut} handleBlur={handleBlur} name="rut" type="text" placeHolder="Ej: 11.111.111-1" />
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
                    <FormInput label="Rol" handleChange={handleChange} values={values.position} handleBlur={handleBlur} name="position" type="text" placeHolder="Ej: Socio, asesor, etc." />
                    {touched.position && errors.position && (
                        <FormikError error={errors.position} />
                    )}
                    <HStack align={"center"} justify={"center"} mt={5} pb={"10%"}>
                        <Button colorScheme={"green"} type="submit" w="full"> Crear Empresa </Button>
                        <Button colorScheme={"red"} w="full" onClick={() => { setContact(values), setStep(1) }}> Volver </Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default ContactForm