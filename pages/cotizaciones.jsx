import { useState, useEffect } from 'react'
import { HStack, Button, Heading, Table, Tr, Thead, Th, Tbody, Container, Input, InputGroup, InputRightElement, TableContainer, InputLeftElement, Center, Spinner } from '@chakra-ui/react'
import { getQuotes } from '../data/quotes'
import QuotesTable from '../components/QuotesTable'
import { AiOutlineClose, AiOutlinePlus, AiOutlineSearch, } from 'react-icons/ai'
import Pagination from '../components/Pagination'
import { useRouter } from 'next/router'

const Cotizaciones = () => {
    const [quotes, setQuotes] = useState([])
    const [filter, setFilter] = useState({
        status: false,
        filteredQuotes: [],
        searchTerm: ''
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage?.getItem('token')
                const res = await getQuotes(token)
                setQuotes(res.data)
                setLoading(false)
            } catch (error) {
                router.push('/')
            }
        }
        fetchData()
    }, [])
    const router = useRouter()
    const rows = 10
    const [page, setPage] = useState(1)
    const results = quotes.filter(quote => {
        return (
            quote.name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
            quote.company.rut.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
            quote.company.contact.name.toLowerCase().includes(filter.searchTerm.toLowerCase())
        )
    })
    const totalPages = Math.ceil(results.length / rows)
    const currentPageData = results.slice((page - 1) * rows, page * rows)
    const handleChange = (page) => setPage(page)

    const setSearch = (e) => {
        if (e.target.value.length > 0) {
            setFilter({
                ...filter,
                status: true,
                searchTerm: e.target.value
            })
        } else {
            setFilter({
                ...filter,
                status: false,
                searchTerm: ''
            })
        }
    }

    if (loading) {
        return (
            <Center h="95vh">
                <Spinner size="xl" />
            </Center>
        )
    }

    return (
        <Container maxW={"container.lg"} centerContent>
            <Heading as={"h1"} mt={10} fontSize={'6xl'}>Cotizaciones</Heading>
            <HStack w={"full"} my={5} align={"center"}>
                <Button leftIcon={<AiOutlinePlus size={20} strokeWidth={150} />} w={{ base: "full", md: "20%" }} fontSize={'2xl'} borderRadius={"3xl"} color={"white"} bgColor={"#7ABC63"} onClick={() => router.push("/cotizaciones/crear")}>Crear</Button>
                <InputGroup w={{ base: "full", md: "40%" }} >
                    <InputLeftElement>
                        <AiOutlineSearch />
                    </InputLeftElement>
                    <Input w={"full"} borderRadius={'3xl'} focusBorderColor={"yellow.600"} value={filter.searchTerm} type="text" placeholder="Buscar" onChange={setSearch} />
                    <InputRightElement _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setFilter({ ...filter, searchTerm: '', status: false })} >
                        <AiOutlineClose />
                    </InputRightElement>
                </InputGroup>
            </HStack>
            <TableContainer w={"full"}>
                <Table variant="striped">
                    <Thead>
                        <Tr textAlign={"center"}>
                            <Th>Nombre Cotización</Th>
                            <Th>RUT Empresa</Th>
                            <Th>Contacto</Th>
                            <Th>Válida hasta</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <QuotesTable quotes={currentPageData} />
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination page={page} count={totalPages} handleChange={handleChange} />
        </Container>
    )
}

export default Cotizaciones