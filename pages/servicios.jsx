import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { HStack, Button, Heading, Spinner, Center, Table, Tr, Thead, Th, Tbody, Container, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import getServices from '../data/getServices'
import ServiceMap from '../components/ServiceMap'
import { AiOutlineClose, } from 'react-icons/ai'
import Pagination from '../components/Pagination'

const servicios = () => {

    const [services, setServices] = useState([])
    const [filteredServices, setFilteredServices] = useState([])
    const [status, setStatus] = useState({
        loading: true,
        filter: false
    })
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [servicesPerPage] = useState(4);
    const indexOfLastRecord = currentPage * servicesPerPage;
    const indexOfFirstRecord = indexOfLastRecord - servicesPerPage;
    const nPages = Math.ceil(services.length / servicesPerPage)
    const currentRecords = services.slice(indexOfFirstRecord, indexOfLastRecord);
    const router = useRouter()

    useEffect(() => {
        getServices()
            .then((res) => {
                setServices(res.data)
                setStatus({
                    loading: false,
                    filter: false
                })
            })
    }, [])

    useEffect(() => {
        const results = services.filter(service => {
            return (
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.price.toString().includes(searchTerm) ||
                service.item.some(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        }).slice(indexOfFirstRecord, indexOfLastRecord)
        setFilteredServices(results)
    }, [searchTerm])

    const setSearch = (e) => {
        if (e.target.value.length > 0) {
            setSearchTerm(e.target.value)
            setStatus({
                loading: false,
                filter: true
            })
        } else {
            setStatus({
                loading: false,
                filter: false
            })
        }
    }

    const renderInfo = () => {
        if (status.filter === false) {
            return <ServiceMap services={currentRecords} setServices={setServices} />
        }
        return <ServiceMap services={filteredServices} setServices={setServices} />
    }

    if (status.loading === true) {
        <Center h="92.5vh">
            <Spinner size="xl" />
        </Center>
    }

    return (
        <Container maxW={"container.lg"} centerContent>
            <Heading mt={10}>Servicios</Heading>
            <HStack w={"full"} my={5}>
                <Button w={"full"} colorScheme="blue" onClick={() => router.push('/servicios/crear')}>Crear</Button>
                <InputGroup w={"full"} >
                    <Input w={"full"} focusBorderColor={"yellow.600"} type="text" placeholder="Buscar" onChange={setSearch} />
                    <InputRightElement children={AiOutlineClose()} _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setSearchTerm('')} />
                </InputGroup>
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
            <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Container>
    )
}

export default servicios