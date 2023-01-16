import { Text, Button, Td, Tr } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const QuotesTable = ({ quotes }) => {
    const router = useRouter()
    if (quotes.length === 0) {
        return (
            <Tr>
                <Td colSpan="6">
                    <Text fontSize="xl" textAlign="center">No se ha encontrado ningúna cotización</Text>
                </Td>
            </Tr>
        )
    }
    return (
        quotes.map(quote => {
            return (
                <Tr key={quote._id}>
                    <Td fontSize={'small'}>{quote.name}</Td>
                    <Td fontSize={'small'}>{quote.company.rut}</Td>
                    <Td fontSize={'small'}>{quote.company.contact.name}</Td>
                    <Td fontSize={'small'}>{new Date(quote.end).toLocaleDateString()}</Td>
                    <Td fontSize={'small'}>
                        <Button bgColor={"#53B6EE"} color="white" _hover={{ bgColor: "#33A7EB" }} onClick={() => router.push("/cotizaciones/ver/" + quote._id)} fontSize={'small'}>Detalles</Button>
                    </Td>
                </Tr>
            )
        })
    )
}

export default QuotesTable