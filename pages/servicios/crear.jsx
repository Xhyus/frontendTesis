import React, { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Center, Spinner } from '@chakra-ui/react';
import { Formik } from 'formik'
import serviceValidation from '../../utils/serviceValidation'
import Item from '../../components/Item';
import FormInput from '../../components/FormInput';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { checkToken } from '../../data/user'
import { postService } from '../../data/services'

export const getServerSideProps = async (context) => {
    try {
        const res = await checkToken(context.req.headers.cookie)
        return {
            props: {
                data: res.data
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}

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
        if (items.length < 8) {
            setItems([...items, {
                id: items[items.length - 1].id + 1,
                name: ''
            }])
        } else {
            return null
        }
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
            <Center h="92.5vh">
                <Spinner size="xl" />
            </Center>
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
                    <form onSubmit={handleSubmit} id="form" >
                        <FormInput label="Nombre del servicio" handleChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Desarrollo de página web" />
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
                        <Heading fontSize={20} pt="5">Lista de Ítems</Heading>
                        {items.map((item, index) => {
                            return <Item key={index} id={item.id} handleDeleteItem={handleDeleteItem} handleChangeItem={handleChangeItem} lastItem={items.length} />
                        })
                        }
                        <Button onClick={handleAddItem} colorScheme="orange" mt="5" w="full">Agregar Ítem</Button>
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

export default crear