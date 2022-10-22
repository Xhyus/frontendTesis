import React, { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Center, Spinner } from '@chakra-ui/react';
import postService from '../../data/postService';
import { Formik } from 'formik'
import serviceValidation from '../../utils/serviceValidation'
import Item from '../../components/Item';
import FormInput from '../../components/FormInput';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const empresa = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { empresa } = router.query


    if (loading) {
        return (
            <Center h="92.5vh">
                <Spinner size="xl" />
            </Center>
        )
    }

    return (
        <Container maxW={"container.md"}>
            <HStack align={"center"} justify={"center"} mt={10}>
                <Heading>Registro de Empresa</Heading>
            </HStack>
            <Formik
                initialValues={{ name: '', description: '', price: '' }}
                validationSchema={serviceValidation}
                onSubmit={(values) => {
                    setLoading(true)

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
                        <UpdateInput label="Nombre del servicio" handleChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Desarrollo de página web" />
                        {touched.name && errors.name && (
                            <Text color={"red"}>{errors.name}</Text>
                        )}
                        <FormInput label="Descripción del servicio" handleChange={handleChange} values={values.description} handleBlur={handleBlur} name="description" type="text" placeHolder="Ej: Desarrollo de página web con diseño responsivo" />
                        {touched.description && errors.description && (
                            <Text color={"red"}>{errors.description}</Text>
                        )}
                        <FormInput label="Precio del servicio" handleChange={handleChange} values={values.price} handleBlur={handleBlur} name="price" type="number" placeHolder="Ej: 10000" />
                        {touched.price && errors.price && (
                            <Text color={"red"}>{errors.price}</Text>
                        )}
                        <HStack align={"center"} justify={"center"} mt={5} pb={"10%"}>
                            <Button colorScheme={"green"} type="submit" w="full"> Crear </Button>
                            <Button colorScheme={"red"} type="reset" w="full" onClick={() => router.push('/servicios')}> Cancelar </Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        </Container >
    )
}

export default empresa