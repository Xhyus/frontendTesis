import { Text, Button, Td, Tr } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const CompanyTable = ({ companies }) => {
    const router = useRouter()

    if (companies.length === 0) {
        return (
            <Tr>
                <Td colSpan="6">
                    <Text fontSize="xl" textAlign="center">No se ha encontrado ningúna empresa</Text>
                </Td>
            </Tr>
        )
    }

    return (
        companies.map(company => {
            return (
                <Tr key={company._id}>
                    <Td fontSize={'small'}>{company.name}</Td>
                    <Td fontSize={'small'}>{company.rut}</Td>
                    <Td fontSize={'small'}>{company.contact.name}</Td>
                    <Td fontSize={'small'}>{company.contact.phone}</Td>
                    <Td fontSize={'small'}>{company.contact.email}</Td>
                    <Td fontSize={'small'}>
                        <Button colorScheme="blue" onClick={() => router.push("/empresa/ver/" + company._id)} fontSize={'small'}>Detalles</Button>
                    </Td>
                </Tr>
            )
        })
    )
}

export default CompanyTable