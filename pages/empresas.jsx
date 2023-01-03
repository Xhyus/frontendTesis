import { useState, useEffect } from 'react'
import { HStack, Button, Heading, Table, Tr, Thead, Th, Tbody, Container, Input, InputGroup, InputRightElement, TableContainer } from '@chakra-ui/react'
import { getCompanies } from '../data/company'
import CompanyTable from '../components/CompanyTable'
import { AiOutlineClose, } from 'react-icons/ai'
import { createSignedPage } from '../data/signed'
import Swal from 'sweetalert2'
import Pagination from '../components/Pagination'

export async function getServerSideProps(context) {
    try {
        const res = await getCompanies(context.req.headers.cookie)
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
const Empresas = ({ data }) => {
    const [companies] = useState(data)
    const [filter, setFilter] = useState({
        status: false,
        filteredCompany: [],
        searchTerm: ''
    })
    const rows = 10
    const [page, setPage] = useState(1)
    const results = companies.filter(company => {
        return (
            company.name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
            company.rut.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
            company.contact.phone.toString().includes(filter.searchTerm) ||
            company.contact.email.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
            company.contact.name.toLowerCase().includes(filter.searchTerm.toLowerCase())
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

    const generateSignedPage = async () => {
        const response = await createSignedPage('company')
        if (response.status === 200) {
            const url = `${process.env.FRONTEND}empresa/crear/${response.data._id}`
            Swal.fire({
                title: 'Página firmada',
                text: ` y se ha copiado a su portapapeles. Puede pegarla en el navegador para verla.`,
                icon: 'success',
                html: `<p>La página firmada se ha generado correctamente.</p> <p>Puede copiar el siguiente enlace:</p><p style="font-size: 0.8rem; font-weight: 600; color: #000;">${url}</p>`,
                confirmButtonText: 'Ok'
            })
        }
    }

    return (
        <Container maxW={"container.lg"} centerContent>
            <Heading mt={10}>Empresas</Heading>
            <HStack w={"full"} my={5}>
                <Button w={"full"} colorScheme="green" onClick={() => generateSignedPage()}>Crear empresa</Button>
                <InputGroup w={"full"} >
                    <Input w={"full"} focusBorderColor={"yellow.600"} type="text" placeholder="Buscar" onChange={setSearch} />
                    <InputRightElement children={AiOutlineClose()} _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setFilter({ filteredCompany: [], status: false, searchTerm: '' })} />
                </InputGroup>
            </HStack>
            <TableContainer w={"full"}>
                <Table variant="striped">
                    <Thead>
                        <Tr textAlign={"center"}>
                            <Th>Nombre Empresa</Th>
                            <Th>RUT Empresa</Th>
                            <Th>Contacto</Th>
                            <Th>Telefono</Th>
                            <Th>Correo</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <CompanyTable companies={currentPageData} />
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination page={page} count={totalPages} handleChange={handleChange} />
        </Container>
    )
}

export default Empresas