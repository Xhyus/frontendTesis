import { useState, useEffect } from 'react'
import { Heading, Button, Container, HStack, Text, Center, Spinner, Input } from '@chakra-ui/react';
import getSpecificService from '../../data/getSpecificService';
import { Formik } from 'formik'
import serviceValidation from '../../utils/serviceValidation'
import ItemUpdate from '../../components/ItemUpdate';
import UpdateInput from '../../components/UpdateInput';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const update = () => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [service, setService] = useState([])
    const router = useRouter()
    const { pid } = router.query

    useEffect(() => {
        (async () => {
            const data = await getSpecificService(pid)
            data.item.map((item, index) => {
                let values = {
                    description: item.description,
                    _id: item._id,
                    id: index
                }
                setItems(items => [...items, values])
            })
            setService(data)
            setLoading(false)
        })();
    }, [pid])

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
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                setItems((items) => items.filter((item) => item.id !== id))
                // setItems(items.filter(item => item.id !== id))
                if (items.length === undefined || items.length === 0) {
                    setItems([{ id: 0, name: '' }])
                }
                items.map(item => {
                    if (item.id > id) {
                        item.id = item.id - 1
                    }
                })
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
                <Heading>Servicio: {service.name}</Heading>
            </HStack>
            <Formik
                initialValues={service}
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
                    console.log(service),
                    <form onSubmit={handleSubmit} id="form" >
                        <UpdateInput label="Nombre del servicio" handleChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Desarrollo de página web" />
                        {touched.name && errors.name && (
                            <Text color={"red"}>{errors.name}</Text>
                        )}
                        <UpdateInput label="Descripción del servicio" handleChange={handleChange} values={values.description} handleBlur={handleBlur} name="description" type="text" placeHolder="Ej: Desarrollo de página web con diseño responsivo" />
                        {touched.description && errors.description && (
                            <Text color={"red"}>{errors.description}</Text>
                        )}
                        <UpdateInput label="Precio del servicio" handleChange={handleChange} values={values.price} handleBlur={handleBlur} name="price" type="number" placeHolder="Ej: 10000" />
                        {touched.price && errors.price && (
                            <Text color={"red"}>{errors.price}</Text>
                        )}
                        <Heading fontSize={20} pt="5">Lista de Ítems</Heading>
                        {items.map((item, index) => {
                            return <ItemUpdate key={index} id={item.id} handleDeleteItem={handleDeleteItem} value={item.description} handleChangeItem={handleChangeItem} lastItem={items.length} />
                        })
                        }
                        <Button onClick={handleAddItem} colorScheme="orange" mt="5" w="full">Agregar Ítem</Button>
                        <HStack align={"center"} justify={"center"} mt={5} pb={"10%"}>
                            <Button colorScheme={"green"} type="submit" w="full">Modificar</Button>
                            <Button colorScheme={"red"} type="reset" w="full" onClick={() => router.push('/servicios')}>Cancelar</Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        </Container >
    )
}

export default update