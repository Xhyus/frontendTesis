import React, { useState } from 'react'
import { Heading, Stack, FormControl, FormLabel, Button, InputRightElement, Container, Link, Tooltip, Flex, HStack } from '@chakra-ui/react';
import postService from '../../data/postService';
import { Formik } from 'formik'
import serviceValidation from '../../utils/serviceValidation'
import Item from '../../components/Item';
import FormInput from '../../components/FormInput';

const crear = () => {

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([{
        id: 0,
        name: ''
    }])
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
        console.log(items)
        items.map(item => {
            if (item.id > id) {
                item.id = item.id - 1
            }
        })
    }


    return (
        <Container maxW={"container.md"}>
            <HStack align={"center"} justify={"center"} mt={10}>
                <Heading>Crear Servicio</Heading>
            </HStack>
            <Formik
                initialValues={{ name: '', description: '', price: '', itemList: [{ id: '0', description: '' }] }}
                validationSchema={serviceValidation}
                onSubmit={(values, actions) => {
                    setLoading(true)
                    postService(values.name, values.description, values.price, values.itemList)
                        .then((res) => {
                            console.log(res.data)
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
                    <form onSubmit={handleSubmit} id="form">
                        <FormInput label="Nombre del servicio" handleChange={handleChange} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Desarrollo de página web" />
                        <FormInput label="Descripción del servicio" handleChange={handleChange} handleBlur={handleBlur} name="description" type="text" placeHolder="Ej: Desarrollo de página web con diseño responsivo" />
                        <FormInput label="Precio del servicio" handleChange={handleChange} handleBlur={handleBlur} name="price" type="number" placeHolder="Ej: 100" />
                        <Heading fontSize={20}>Lista de Items</Heading>
                        {items.map((item, index) => {
                            return <Item key={index} id={item.id} handleDeleteItem={handleDeleteItem} handleChangeItem={handleChangeItem} lastItem={items.length} />
                        })
                        }
                        <HStack align={"center"} justify={"center"} mt={10}>
                            <Button onClick={handleAddItem}>Agregar Item</Button>
                            <Button colorScheme={"green.300"} color="white" type="submit" mt={4} isLoading={loading}> Crear </Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        </Container>
    )
}

export default crear