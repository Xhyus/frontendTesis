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
    const dateFormat = (date) => {
        const dateObj = new Date(date)
        const newDate = new Date(dateObj.setDate(dateObj.getDate() + 31))
        return newDate.toLocaleDateString()
    }
    return (
        quotes.map(quote => {
            return (
                console.log(quote.company),
                <Tr key={quote._id}>
                    <Td fontSize={'small'}>{quote.name}</Td>
                    <Td fontSize={'small'}>{quote.company.rut}</Td>
                    <Td fontSize={'small'}>{quote.company.contact.name}</Td>
                    <Td fontSize={'small'}>{quote.created === quote.updated ? dateFormat(quote.created) : dateFormat(quote.updated)}</Td>
                    <Td fontSize={'small'}>
                        <Button colorScheme="blue" onClick={() => router.push("/cotizacion/ver/" + quote._id)} fontSize={'small'}>Detalles</Button>
                    </Td>
                </Tr>
            )
        })
    )
}

export default QuotesTable