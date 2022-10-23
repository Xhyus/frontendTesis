import React from 'react'
import { Heading, HStack, FormControl, Input, FormLabel, InputGroup, Button, InputRightElement, Container, Link, Tooltip, Flex, Image } from '@chakra-ui/react';
import { Formik } from 'formik';
import FormInput from './FormInput';
import Swal from 'sweetalert2'

const Constituted = ({ state }) => {
    if (state) {
        return (
            <Formik
                initialValues={{ name: '', description: '', price: '' }}
                validationSchema={null}
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
                        <FormInput label="Nombre de la empresa" handleChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Estudio Fragua" />

                        <FormInput label="Razón social" handleChange={handleChange} values={values.description} handleBlur={handleBlur} name="description" type="text" placeHolder="Ej: Desarrollo de página web con diseño responsivo" />

                        <FormInput label="Precio del servicio" handleChange={handleChange} values={values.price} handleBlur={handleBlur} name="price" type="number" placeHolder="Ej: 10000" />
                        {/* {touched.price && errors.price && (
                            <Text color={"red"}>{errors.price}</Text>
                        )} */}
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
                initialValues={{ name: '', description: '', price: '' }}
                validationSchema={null}
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
                        <FormInput label="Nombre del cliente" handleChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Estudio Fragua" />

                        <FormInput label="RUT" handleChange={handleChange} values={values.description} handleBlur={handleBlur} name="description" type="text" placeHolder="Ej: Desarrollo de página web con diseño responsivo" />

                        <FormInput label="Telefono de contacto" handleChange={handleChange} values={values.price} handleBlur={handleBlur} name="price" type="number" placeHolder="Ej: 10000" />
                        {/* {touched.price && errors.price && (
                            <Text color={"red"}>{errors.price}</Text>
                        )} */}
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