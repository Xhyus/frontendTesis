import React, { useState } from 'react'
import { Heading, Button, Container, HStack } from '@chakra-ui/react';
import postService from '../../data/postService';
import { Formik } from 'formik'
import serviceValidation from '../../utils/serviceValidation'
import Item from '../../components/Item';
import FormInput from '../../components/FormInput';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const crear = () => {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([{
        id: 0,
        name: ''
    }])
    const router = useRouter()

    const handleChangeItem = (e) => {
        setItems(
            items.map(item => {
                if (item.id.toString() === e.target.name) {
                    item.name = e.target.value
                    return {
                        ...item,
                        name: e.target.value
                    }
                }
                return item
            })
        )
    }

    const handleAddItem = () => {
        setItems([...items, {
            id: items[items.length - 1].id + 1,
            name: ''
        }])
    }

    const handleDeleteItem = (id) => {
        setItems(items.filter(item => item.id !== id))
        items.map(item => {
            if (item.id > id) {
                item.id = item.id - 1
            }
        })
    }

    if (loading) {
        return (
            <Container maxW="container.xl" centerContent>
                <Heading>Creando servicio...</Heading>
            </Container>
        )
    }

    return (
        <Container maxW={"container.md"}>
            <HStack align={"center"} justify={"center"} mt={10}>
                <Heading>Crear Servicio</Heading>
            </HStack>
            <Formik
                initialValues={{ name: '', description: '', price: '' }}
                validationSchema={serviceValidation}
                onSubmit={(values) => {
                    setLoading(true)
                    postService(values.name, values.description, values.price, items)
                        .then((res) => {
                            if (res.status === 200) {
                                Swal.fire({
                                    title: 'Servicio creado',
                                    text: 'El servicio ha sido creado correctamente',
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar'
                                }).then(() => {
                                    router.replace('/servicios')
                                })
                            }

                        })
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
                    <form onSubmit={handleSubmit} id="form">
                        <FormInput label="Nombre del servicio" handleChange={handleChange} values={values.name} errors={errors} touched={touched} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Desarrollo de página web" />
                        <FormInput label="Descripción del servicio" handleChange={handleChange} values={values.description} errors={errors} touched={touched} handleBlur={handleBlur} name="description" type="text" placeHolder="Ej: Desarrollo de página web con diseño responsivo" />
                        <FormInput label="Precio del servicio" handleChange={handleChange} values={values.price} errors={errors} touched={touched} handleBlur={handleBlur} name="price" type="number" placeHolder="Ej: 100" />
                        <Heading fontSize={20}>Lista de Items</Heading>
                        {items.map((item, index) => {
                            return <Item key={index} id={item.id} handleDeleteItem={handleDeleteItem} handleChangeItem={handleChangeItem} lastItem={items.length} />
                        })
                        }
                        <Button onClick={handleAddItem} colorScheme="orange" mt="5" w="full">Agregar Item</Button>
                        <HStack align={"center"} justify={"center"} mt={5}>
                            <Button colorScheme={"green"} type="submit" w="full"> Crear </Button>
                            <Button colorScheme={"red"} type="reset" w="full"> Cancelar </Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        </Container >
    )
}

export default crear