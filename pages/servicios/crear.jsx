import React, { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Center, Spinner, Select, FormControl, FormLabel, Tooltip } from '@chakra-ui/react';
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

const Crear = () => {
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
                initialValues={{ name: '', description: '', price: '', type: '' }}
                validationSchema={serviceValidation}
                onSubmit={(values) => {
                    setLoading(true)
                    postService(values.name, values.description, values.price, values.type, items)
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
                        .catch((err) => {
                            Swal.fire({
                                title: 'Error',
                                text: 'Ha ocurrido un error',
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            })
                            setLoading(false)
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
                        <FormInput label="Nombre del servicio" onChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Desarrollo de p??gina web" />
                        {touched.name && errors.name && (
                            <Text color={"red"}>{errors.name}</Text>
                        )}
                        <FormInput label="Descripci??n del servicio" onChange={handleChange} values={values.description} handleBlur={handleBlur} name="description" type="text" placeHolder="Ej: Desarrollo de p??gina web con dise??o responsivo" />
                        {touched.description && errors.description && (
                            <Text color={"red"}>{errors.description}</Text>
                        )}
                        <HStack>
                            <FormInput label="Precio del servicio" onChange={handleChange} values={values.price} handleBlur={handleBlur} name="price" type="number" placeHolder="Ej: 5 UF" />
                            <FormControl isRequired py={3}>
                                <FormLabel>Tipo de servicio</FormLabel>
                                <Tooltip label="Seleccione el tipo de servicio" aria-label="Seleccione el tipo de servicio">
                                    <Select placeholder="Seleccione el tipo de servicio" name="type" onChange={handleChange} onBlur={handleBlur} value={values.type}>
                                        <option value="Dise??o">Dise??o</option>
                                        <option value="Desarrollo">Desarrollo Web</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Otros">Otros</option>
                                    </Select>
                                </Tooltip>
                            </FormControl>
                        </HStack>
                        <HStack justify={"space-between"}>
                            {touched.price && errors.price && (
                                <Text color={"red"}>{errors.price}</Text>
                            )}
                            {touched.type && errors.type && (
                                <Text color={"red"}>{errors.type}</Text>
                            )}
                        </HStack>
                        <Heading fontSize={20} pt="5">Lista de ??tems</Heading>
                        {items.map((item, index) => {
                            return <Item key={index} id={item.id} handleDeleteItem={handleDeleteItem} handleChangeItem={handleChangeItem} lastItem={items.length} />
                        })
                        }
                        <Button onClick={handleAddItem} colorScheme="orange" mt="5" w="full">Agregar ??tem</Button>
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

export default Crear