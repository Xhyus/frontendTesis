import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Text, Stack, HStack, Button, Heading, Spinner, Center, Td, Table, Tr, Thead, Th, Tbody, Container, FormControl, Input, ListItem, List } from '@chakra-ui/react'
import getServices from '../data/getServices'
import ServiceMap from '../components/ServiceMap'

const servicios = () => {

    const [services, setServices] = useState([])
    const [filteredServices, setFilteredServices] = useState([])
    const [filter, setFilter] = useState(false)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    useEffect(() => {
        getServices()
            .then((res) => {
                setServices(res.data)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        // filter by name, description, price, item.description
        const results = services.filter(service => {
            return (
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.price.toString().includes(searchTerm) ||
                service.item.some(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        })
        setFilteredServices(results)
    }, [searchTerm])

    const setSearch = (e) => {
        if (e.target.value.length > 0) {
            setSearchTerm(e.target.value)
            setFilter(true)
        } else {
            setFilter(false)
        }
    }

    const renderInfo = () => {
        if (filter === true) {
            return (
                <ServiceMap services={filteredServices} />
            )
        } else {
            return (
                <ServiceMap services={services} />
            )
        }
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
                    {renderInfo()}
                </Tbody>
            </Table>
        </Container>

    )
}

export default servicios