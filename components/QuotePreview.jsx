import React from 'react'
import { Heading, Text, Container, Button, HStack, Stack } from '@chakra-ui/react'
import TagText from './TagText'

const QuotePreview = ({ quote, selectedServices, setStep }) => {
    console.log(quote)

    const handleSubmit = () => {
        console.log(quote)
    }

    return (
        <Container maxW={"container.xl"} px={5} pb={10}>
            <Heading as={"h1"} mt={10} mb={5} fontSize={'6xl'} textAlign={{ base: "start", md: "center" }}>Crear Cotización</Heading>
            <Stack pb={10}>
                <Heading as={"h2"} fontSize={'3xl'} fontWeight={"bold"}>Vista previa de la cotización</Heading>
                <TagText tag={"Nombre de la cotización"} data={quote.name} />
                <TagText tag={"Empresa cotizante"} data={quote.company.name} />
                <TagText tag={"Medio de pago"} data={quote.payment.name} />
                <TagText tag={"Tipo de factura"} data={quote.document.name} />
                <TagText tag={"Formalización"} data={quote.formalization.name} />
                <TagText tag={"Metodo de pago"} data={quote.paymentMethod} />
                <TagText tag={"Descripción de la cotización"} data={quote.description} />
                <TagText tag={"Plazo de entrega"} data={quote.projectDelivery} />
            </Stack>
            <Stack>
                <Heading as={"h2"} fontSize={'3xl'} fontWeight={"bold"}>Servicios cotizados:</Heading>
                {selectedServices.length === 0 && <Text>No se han añadido servicios a la cotización</Text>}
                {selectedServices.map((service, index) => {
                    return (
                        <TagText key={index} tag={`Servicio ${index + 1}`} data={service.title} />
                    )
                })}
                <HStack w={"full"} py={5}>
                    <Button color={"white"} w={"full"} bgColor={"#7ABC63"} borderRadius={'3xl'} onClick={handleSubmit}>Crear cotización</Button>
                    <Button colorScheme={"blue"} w={"full"} borderRadius={'3xl'} onClick={() => setStep(1)}>Atras</Button>
                </HStack>
            </Stack>
        </Container >
    )
}

export default QuotePreview