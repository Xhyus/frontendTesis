import React from 'react'
import { Heading, HStack, Text, Input, FormLabel, InputGroup, Button, InputRightElement, Container, Link, Tooltip, Flex, Image, Stack } from '@chakra-ui/react';
import { Formik } from 'formik';
import FormInput from './FormInput';
import Swal from 'sweetalert2'
import FormikError from './FormikError';
import constitutedValidation from '../utils/constitutedValidation';
import unconstitutedValidation from '../utils/unconstitutedValidation';

const Constituted = ({ state }) => {
    if (state) {
        return (
            <Formik
                initialValues={{ name: '', socialReason: '', rut: '', email: '', phone: '', address: '', contactName: '', contactEmail: '', contactPhone: '', contactPosition: '', contactRut: '' }}
                validationSchema={constitutedValidation}
                onSubmit={(values) => {
                    console.log('constituida', values)
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
                        <Heading as="h2" size="lg" mb={4} color="white">Datos del contacto</Heading>
                        <FormInput label="Nombre" handleChange={handleChange} values={values.contactName} handleBlur={handleBlur} name="contactName" type="text" placeHolder="Ej: Juan Pérez" />
                        {touched.contactName && errors.contactName && (
                            <FormikError error={errors.contactName} />
                        )}
                        <FormInput label="Email" handleChange={handleChange} values={values.contactEmail} handleBlur={handleBlur} name="contactEmail" type="email" placeHolder="Ej: Correo@gmail.cl" />
                        {touched.contactEmail && errors.contactEmail && (
                            <FormikError error={errors.contactEmail} />
                        )}
                        <HStack>
                            <Stack w={'full'}>
                                <FormInput label="RUT" handleChange={handleChange} values={values.contactRut} handleBlur={handleBlur} name="contactRut" type="text" placeHolder="Ej: 11.111.111-1" />
                            </Stack>
                            <Stack w={'full'}>
                                <FormInput label="Teléfono" handleChange={handleChange} values={values.contactPhone} handleBlur={handleBlur} name="contactPhone" type="text" placeHolder="Ej: +569 1234 5678" />
                            </Stack>
                        </HStack>
                        <HStack>
                            {touched.contactRut && errors.contactRut && (
                                <FormikError error={errors.contactRut} />
                            )}
                            {touched.contactPhone && errors.contactPhone && (
                                <FormikError error={errors.contactPhone} />
                            )}
                        </HStack>
                        <FormInput label="Cargo" handleChange={handleChange} values={values.contactPosition} handleBlur={handleBlur} name="contactPosition" type="text" placeHolder="Ej: Gerente" />
                        {touched.contactPosition && errors.contactPosition && (
                            <FormikError error={errors.contactPosition} />
                        )}
                        <HStack align={"center"} justify={"center"} mt={5} pb={"10%"}>
                            <Button colorScheme={"green"} type="submit" w="full"> Crear Empresa </Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        )
    }
    if (!state) {
        return (
            <Formik
                initialValues={{ name: '', rut: '', email: '', phone: '', contactName: '', contactEmail: '', contactPhone: '', contactPosition: '', contactRut: '' }}
                validationSchema={unconstitutedValidation}
                onSubmit={(values) => {
                    console.log('constituida', values)
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
                        <FormInput label="Dirección" handleChange={handleChange} values={values.address} handleBlur={handleBlur} name="address" type="text" placeHolder="Ej: Av. Siempre Viva 123" />
                        {touched.address && errors.address && (
                            <FormikError error={errors.address} />
                        )}
                        <Heading as="h2" size="lg" mb={4} color="white">Datos del contacto</Heading>
                        <FormInput label="Nombre" handleChange={handleChange} values={values.contactName} handleBlur={handleBlur} name="contactName" type="text" placeHolder="Ej: Juan Pérez" />
                        {touched.contactName && errors.contactName && (
                            <FormikError error={errors.contactName} />
                        )}
                        <FormInput label="Email" handleChange={handleChange} values={values.contactEmail} handleBlur={handleBlur} name="contactEmail" type="email" placeHolder="Ej: Correo@gmail.cl" />
                        {touched.contactEmail && errors.contactEmail && (
                            <FormikError error={errors.contactEmail} />
                        )}
                        <HStack>
                            <Stack w={'full'}>
                                <FormInput label="RUT" handleChange={handleChange} values={values.contactRut} handleBlur={handleBlur} name="contactRut" type="text" placeHolder="Ej: 11.111.111-1" />
                            </Stack>
                            <Stack w={'full'}>
                                <FormInput label="Teléfono" handleChange={handleChange} values={values.contactPhone} handleBlur={handleBlur} name="contactPhone" type="text" placeHolder="Ej: +569 1234 5678" />
                            </Stack>
                        </HStack>
                        <HStack>
                            {touched.contactRut && errors.contactRut && (
                                <FormikError error={errors.contactRut} />
                            )}
                            {touched.contactPhone && errors.contactPhone && (
                                <FormikError error={errors.contactPhone} />
                            )}
                        </HStack>
                        <FormInput label="Cargo" handleChange={handleChange} values={values.contactPosition} handleBlur={handleBlur} name="contactPosition" type="text" placeHolder="Ej: Gerente" />
                        {touched.contactPosition && errors.contactPosition && (
                            <FormikError error={errors.contactPosition} />
                        )}
                        <HStack align={"center"} justify={"center"} mt={5} pb={"10%"}>
                            <Button colorScheme={"green"} type="submit" w="full"> Crear Empresa </Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        )
    }
}

export default Constituted