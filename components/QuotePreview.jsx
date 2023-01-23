import { Heading, Text, Container, Button, HStack, Stack } from '@chakra-ui/react'
import TagText from './TagText'
import { createQuote } from '../data/quotes'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const QuotePreview = ({ quote, selectedServices, setStep }) => {
    const router = useRouter()
    const handleSubmit = async () => {
        if (selectedServices.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe seleccionar al menos un servicio',
            })
        }

        try {
            await createQuote({
                name: quote.name,
                description: quote.description,
                paymentMethod: quote.paymentMethod,
                projectDelivery: quote.projectDelivery,
                company: quote.company.id,
                payment: quote.payment.value,
                formalization: quote.formalization.value,
                documents: quote.document.value,
                services: selectedServices.map(service => service.id)
            })
            await Swal.fire({
                title: 'Cotización creada',
                text: 'La cotización ha sido creada con éxito',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            router.push('/cotizaciones')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error',
            })
        }
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
                    <Button bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} w={"full"} borderRadius={'3xl'} onClick={handleSubmit}>Crear cotización</Button>
                    <Button bgColor={"#53B6EE"} color="white" _hover={{ bgColor: "#33A7EB" }} w={"full"} borderRadius={'3xl'} onClick={() => setStep(1)}>Atras</Button>
                </HStack>
            </Stack>
        </Container >
    )
}

export default QuotePreview