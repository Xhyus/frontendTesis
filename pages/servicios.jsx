import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { HStack, Button, Heading, Spinner, Center, Table, Tr, Thead, Th, Tbody, Container, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import getServices from '../data/getServices'
import ServiceMap from '../components/ServiceMap'
import { AiOutlineClose, } from 'react-icons/ai'
// import Pagination from '../components/Pagination'
// import calculatePagination from '../utils/calculatePagination'

const servicios = () => {

    const [services, setServices] = useState([])
    const [filteredServices, setFilteredServices] = useState([])
    const [filter, setFilter] = useState(false)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    // const [currentPage, setCurrentPage] = useState(1)
    // const [filteredCurrentPage, setFilteredCurrentPage] = useState(1)
    // const [servicesPerPage] = useState(5)
    // const [calculatedPagination, setCalculatedPagination] = useState({})
    const router = useRouter()

    useEffect(() => {
        getServices()
            .then((res) => {
                setServices(res.data)
                // let pagination = calculatePagination(res.data, servicesPerPage)
                // console.log(pagination)
                // setCalculatedPagination(pagination)
                setLoading(false)
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

    if (loading === true) {
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
            {/* <Pagination
                nPages={calculatedPagination.nPages}
                currentPage={calculatedPagination.currentPage}
                setCurrentPage={filter === true ? setFilteredCurrentPage : setCurrentPage}
            /> */}
        </Container>
    )
}

export default servicios