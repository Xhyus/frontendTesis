import { useState, useEffect } from 'react'
import { Heading, Button, Container, HStack, Center, Spinner, Select, FormControl, FormLabel, Tooltip } from '@chakra-ui/react';
import { Formik } from 'formik'
import serviceValidation from '../../utils/serviceValidation'
import Item from '../../components/Item';
import FormInput from '../../components/FormInput';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { checkToken } from '../../data/user'
import { postService } from '../../data/services'
import TextareaForm from '../../components/TextareaForm';
import FormikError from '../../components/FormikError';

const Crear = () => {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([{
        id: 0,
        name: ''
    }])
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage?.getItem('token')
                await checkToken(token)
            } catch (error) {
                router.push(
                    '/servicios', {
                    pathname: '/servicios',
                    permanent: true
                })
            }
        }
        fetchData()
    }, [])

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
                onSubmit={async (values) => {
                    try {
                        setLoading(true)
                        items.map(item => {
                            if (item.name.trim() === '') {
                                setLoading(false)
                                return Swal.fire({
                                    title: 'Error',
                                    text: 'El ítem no puede estar vacío',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                })
                            }
                        })
                        let token = localStorage?.getItem('token')
                        await postService(values.name, values.description, values.price, values.type, items, token)
                        Swal.fire({
                            title: 'Servicio creado',
                            text: 'El servicio ha sido creado correctamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            router.replace('/servicios')
                        })
                    } catch (error) {
                        Swal.fire({
                            title: 'Error',
                            text: 'Ha ocurrido un error',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })
                        setLoading(false)
                    }
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
                    <form onSubmit={handleSubmit} >
                        <FormInput label="Nombre del servicio" onChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Desarrollo de página web" errors={errors.name} touched={touched.name} />
                        <TextareaForm label="Descripción" name="description" placeholder="Ingrese una descripción de la cotización" value={values.description} onChange={handleChange} onBlur={handleBlur} errors={errors.description} touched={touched.description} />
                        <HStack>
                            <FormInput label="Precio del servicio" onChange={handleChange} values={values.price} handleBlur={handleBlur} name="price" type="number" placeHolder="Ej: 5 UF" />
                            <FormControl isRequired py={3}>
                                <FormLabel>Tipo de servicio</FormLabel>
                                <Tooltip label="Seleccione el tipo de servicio" aria-label="Seleccione el tipo de servicio">
                                    <Select placeholder="Seleccione el tipo de servicio" name="type" onChange={handleChange} onBlur={handleBlur} value={values.type}>
                                        <option value="Diseño">Diseño</option>
                                        <option value="Desarrollo">Desarrollo Web</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Otros">Otros</option>
                                    </Select>
                                </Tooltip>
                            </FormControl>
                        </HStack>
                        <HStack justify={"space-between"}>
                            {touched.price && errors.price && (
                                <FormikError error={errors.price} />
                            )}
                            {touched.type && errors.type && (
                                <FormikError error={errors.type} />
                            )}
                        </HStack>
                        <Heading fontSize={20} pt="5">Lista de Ítems</Heading>
                        {items.map((item, index) => {
                            return <Item key={index} id={item.id} handleDeleteItem={handleDeleteItem} handleChangeItem={handleChangeItem} lastItem={items.length} />
                        })}
                        <Button onClick={handleAddItem} bgColor={"#FF9F0F"} color="white" _hover={{ bgColor: "#F59300" }} mt="5" w="full">Agregar Ítem</Button>
                        <HStack align={"center"} justify={"center"} mt={5} pb={"10%"}>
                            <Button bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} type="submit" w="full"> Crear </Button>
                            <Button bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} type="reset" w="full" onClick={() => router.push('/servicios')}> Cancelar </Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        </Container >
    )
}

export default Crear