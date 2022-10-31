import { useState, useEffect } from 'react'
import { Heading, Button, Container, HStack, Text } from '@chakra-ui/react';
import getSpecificService from '../../data/getSpecificService';
import { Formik } from 'formik'
import serviceValidation from '../../utils/serviceValidation'
import ItemUpdate from '../../components/ItemUpdate';
import FormInput from '../../components/FormInput';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import updateServices from '../../data/updateServices';
import updateManyItems from '../../data/updateManyItems';

export async function getServerSideProps(context) {
    try {
        const res = await getSpecificService(context.query, context.req.headers.cookie)
        return {
            props: {
                data: res.data
            }
        }
    } catch (error) {
        if (error.status === 401) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        } else {
            return {
                redirect: {
                    destination: '/servicios',
                    permanent: false
                }
            }
        }
    }
}

const update = ({ data }) => {
    const [items, setItems] = useState([])
    const [service] = useState(data)
    const router = useRouter()
    const { sid } = router.query // sid = service id

    useEffect(() => {
        (async () => {
            data.item.map((item, index) => {
                let values = {
                    description: item.description,
                    _id: item._id,
                    id: index
                }
                setItems(items => [...items, values])
            })
        })();
    }, [sid])

    const handleChangeItem = (e) => {
        setItems(
            items.map(item => {
                if (item.id.toString() === e.target.name) {
                    item.name = e.target.value
                    return {
                        ...item,
                        description: e.target.value
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
                description: ''
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
                if (items.length === 1) {
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

    return (
        <Container maxW={"container.md"}>
            <HStack align={"center"} justify={"center"} mt={10}>
                <Heading>Servicio: {service.name}</Heading>
            </HStack>
            <Formik
                initialValues={service}
                validationSchema={serviceValidation}
                onSubmit={(values) => {
                    try {
                        updateServices(sid, values)
                            .then(() => {
                                let itemList = []
                                items.map(item => {
                                    itemList.push(item.description)
                                })
                                updateManyItems(sid, itemList)
                                    .then(() => {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Servicio actualizado',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        router.push('/servicios')
                                    })
                            })
                    } catch (error) {

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