import { useState, useEffect } from 'react'
import { HStack, Button, Heading, Table, Tr, Thead, Th, Tbody, Container, Input, InputGroup, InputRightElement, TableContainer } from '@chakra-ui/react'
import { getQuotes } from '../data/quotes'
import QuotesTable from '../components/QuotesTable'
import { AiOutlineClose, } from 'react-icons/ai'
import Pagination from '../components/Pagination'

export async function getServerSideProps(context) {
    try {
        const res = await getQuotes(context.req.headers.cookie)
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
const cotizaciones = ({ data }) => {
    const [quotes] = useState(data)
    const [filter, setFilter] = useState({
        status: false,
        filteredQuotes: [],
        searchTerm: ''
    })
    const rows = 10
    const [page, setPage] = useState(1)
    const results = quotes.filter(quote => {
        return (
            quote.name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
            quote.company.rut.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
            quote.company.contact.name.toString().includes(filter.searchTerm)
        )
    })
    const totalPages = Math.ceil(results.length / rows)
    const currentPageData = results.slice((page - 1) * rows, page * rows)
    const handleChange = (page) => {
        setPage(page)
    }

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

    return (
        <Container maxW={"container.lg"} centerContent>
            <Heading mt={10}>Cotizaciones</Heading>
            <HStack w={"full"} my={5}>
                <Button w={"full"} colorScheme="green" onClick={() => generateSignedPage()}>Crear empresa</Button>
                <InputGroup w={"full"} >
                    <Input w={"full"} focusBorderColor={"yellow.600"} type="text" placeholder="Buscar" onChange={setSearch} />
                    <InputRightElement children={AiOutlineClose()} _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setFilter({ filteredQuotes: [], status: false, searchTerm: '' })} />
                </InputGroup>
            </HStack>
            <TableContainer w={"full"}>
                <Table variant="striped">
                    <Thead>
                        <Tr textAlign={"center"}>
                            <Th>Nombre Cotización</Th>
                            <Th>RUT Empresa</Th>
                            <Th>Contacto</Th>
                            <Th>Valida hasta</Th>
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

export default cotizaciones