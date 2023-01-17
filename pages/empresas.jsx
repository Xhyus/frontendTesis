import { useState } from 'react'
import { Heading, Table, Tr, Thead, Th, Tbody, Container, TableContainer } from '@chakra-ui/react'
import { getCompanies } from '../data/company'
import CompanyTable from '../components/CompanyTable'
import { createSignedPage } from '../data/signed'
import Swal from 'sweetalert2'
import Pagination from '../components/Pagination'
import SearchButton from '../components/SearchButton'

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