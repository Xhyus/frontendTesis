import { useState, useEffect } from 'react'
import { Heading, Table, Tr, Thead, Th, Tbody, Container, TableContainer, Center, Spinner } from '@chakra-ui/react'
import { getCompanies } from '../data/company'
import CompanyTable from '../components/CompanyTable'
import { createSignedPage } from '../data/signed'
import Swal from 'sweetalert2'
import Pagination from '../components/Pagination'
import SearchButton from '../components/SearchButton'
import { useRouter } from 'next/router'

const Empresas = () => {
    const [companies, setCompany] = useState([])
    const [filter, setFilter] = useState({
        status: false,
        filteredCompany: [],
        searchTerm: ''
    })
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage?.getItem('token')
                const res = await getCompanies(token)
                setCompany(res.data)
                setLoading(false)
            } catch (error) {
                router.push(
                    '/', {
                    pathname: '/',
                    permanent: true
                })
            }
        }
        fetchData()
    }, [])
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
    const handleChange = (page) => setPage(page)

    const setSearch = (e) => {
        if (e.target?.value.length > 0) {
            setFilter({
                status: true,
                searchTerm: e.target.value,
                filteredCompany: results
            })
        } else {
            setFilter({
                filteredCompany: results,
                status: false,
                searchTerm: ''
            })
        }
    }

    const generateSignedPage = async () => {
        try {
            let token = localStorage?.getItem('token')
            const response = await createSignedPage('company', token)
            const url = `${process.env.FRONTEND}empresa/crear/${response.data._id}`
            Swal.fire({
                title: 'Link generado',
                text: ` El link para crear una empresa ha sido generado correctamente.`,
                icon: 'success',
                html: `<p>El link para crear una empresa ha sido generado correctamente.</p> <p>Puede copiar el siguiente enlace:</p><p style="font-size: 0.8rem; font-weight: 600; color: #000;">${url}</p>`,
                confirmButtonText: 'Ok'
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al generar la página',
                icon: 'error',
                confirmButtonText: 'Ok'
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
            <Heading as={"h1"} mt={10} fontSize={'6xl'}>Empresas</Heading>
            <SearchButton setSearch={setSearch} func={generateSignedPage} text={"Crear empresa"} searchTerm={filter.searchTerm} />
            <TableContainer w={"full"}>
                <Table variant="striped">
                    <Thead>
                        <Tr textAlign={"center"}>
                            <Th>Nombre Empresa</Th>
                            <Th>RUT Empresa</Th>
                            <Th>Contacto</Th>
                            <Th>Teléfono</Th>
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