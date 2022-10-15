import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Text, Stack, HStack, Button, Heading, Spinner, Center, Td, Table, Tr, Thead, Th, Tbody, Container, FormControl, Input, ListItem, List } from '@chakra-ui/react'
import getServices from '../data/getServices'

const servicios = () => {

    const [services, setServices] = useState([])
    const [filteredServices, setFilteredServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    useEffect(() => {
        getServices()
            .then((res) => {
                setServices(res.data)
                console.log(res.data)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        setFilteredServices(
            services.filter(service => {
                return service.name.toLowerCase().includes(searchTerm.toLowerCase())
            })
        )
    }, [searchTerm])

    const setSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    if (loading) {
        <Center h="92.5vh">
            <Spinner size="xl" />
        </Center>
    }

    return (
        <Container maxW={"container.lg"} centerContent>
            <Heading mt={10}>Servicios</Heading>
            <HStack w={"full"} my={5}>
                <Button w={"full"} colorScheme="blue" onClick={() => router.push('/servicios/crear')}>Crear</Button>
                <Input w={"full"} type="text" placeholder="Buscar" onChange={setSearch} />
            </HStack>
            <Table variant="striped">
                <Thead>
                    <Tr textAlign={"center"}>
                        <Th>Nombre</Th>
                        <Th>Descripción</Th>
                        <Th>Precio</Th>
                        <Th>Items</Th>
                        <Th>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        services.map(service => {
                            return (
                                <Tr id={service._id}>
                                    <Td>{service.name} para para para para para para</Td>
                                    <Td>{service.description} para para para para para para</Td>
                                    <Td>${service.price}</Td>
                                    <Td>
                                        <List>{service.item.map(item => {
                                            return (
                                                <ListItem id={item._id}>
                                                    <Text>{item.description} para para para para para para</Text>
                                                </ListItem>
                                            )
                                        })}</List>
                                    </Td>
                                    <Td>
                                        <HStack>
                                            <Button colorScheme="blue">Editar</Button>
                                            <Button colorScheme="red">Eliminar</Button>
                                        </HStack>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </Container>

    )
}

export default servicios