import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { HStack, Button, Heading, Table, Tr, Thead, Th, Tbody, Container, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { getServices } from '../data/services'
import ServiceMap from '../components/ServiceMap'
import { AiOutlineClose, } from 'react-icons/ai'
// import Pagination from '../components/Pagination'
// import calculatePagination from '../utils/calculatePagination'

export async function getServerSideProps(context) {
    try {
        const res = await getServices(context.req.headers.cookie)
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
const servicios = ({ data }) => {
    const [services] = useState(data)
    const [filteredServices, setFilteredServices] = useState([])
    const [filter, setFilter] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    // const [currentPage, setCurrentPage] = useState(1)
    // const [filteredCurrentPage, setFilteredCurrentPage] = useState(1)
    // const [servicesPerPage] = useState(5)
    // const [calculatedPagination, setCalculatedPagination] = useState({})
    const router = useRouter()

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
                    {filter === true ? <ServiceMap services={filteredServices} /> : <ServiceMap services={services} />}
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