import { Heading, Button, Container, HStack, Stack, Tag, TagLabel, TagLeftIcon, Grid, Box, Text } from '@chakra-ui/react'
import { getQuote, deleteQuote } from '../../../data/quotes'
import { useRouter } from 'next/router'
import TextCopy from '../../../components/TextCopy'
import { FaCalendarTimes, FaCalendarPlus } from 'react-icons/fa'
import { formatDate, formatFormalization, formatTitleDetail, formatText } from '../../../utils/formatInfo'
import Swal from 'sweetalert2'
import TagText from '../../../components/TagText'

export async function getServerSideProps(context) {
    try {
        const loggedIn = context.req.headers.cookie.split(';').find(c => c.trim().startsWith('loggedIn=')).split('=')[1]
        if (loggedIn === 'true') {
            const res = await getQuote(context.query.cotizacion, context.req.headers.cookie)
            return {
                props: {
                    data: res.data
                }
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

const VerCotizacion = ({ quote }) => {
    const router = useRouter()
    const handleDelete = async () => {
        try {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteQuote(quote._id)
                    Swal.fire({
                        title: 'Cotización eliminada',
                        text: 'La cotización ha sido eliminada correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                    router.push('/cotizaciones')
                }
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al eliminar la cotización',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }
    return (
        <Container maxW={"container.lg"}>
            <HStack align={"center"} justify={"center"} my={10}>
                <Tag size={"lg"} colorScheme={"green"} variant="solid">
                    <TagLeftIcon as={FaCalendarPlus} boxSize="12px" />
                    <TagLabel>{formatDate(quote.created)}</TagLabel>
                </Tag>
                <Tag size={"lg"} colorScheme={"red"} variant="solid">
                    <TagLeftIcon as={FaCalendarTimes} boxSize="12px" />
                    <TagLabel>{formatDate(quote.end)}</TagLabel>
                </Tag>
            </HStack>
            <Heading as={"h1"} my={10} fontSize={{ base: '5xl', md: '6xl' }}>{formatTitleDetail(quote.name)}</Heading>
            <HStack mb={5}>
                <Button bgColor={"#53B6EE"} color="white" _hover={{ bgColor: "#33A7EB" }} w="full" onClick={() => router.push('/cliente/cotizacion/' + quote.url)}>Ver cotización</Button>
                <Button bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} w="full" onClick={() => handleDelete()}>Eliminar cotización</Button>
            </HStack>
            <HStack justify={"space-between"} wrap={{ base: "wrap", md: "nowrap" }} align={"flex-start"} w={"full"}>
                <Stack justify={"center"} w={{ base: "100%", md: "50%" }} >
                    <Heading size={"md"} color={"Orange"}>Datos de la empresa</Heading>
                    <TextCopy prefix={"Nombre"} data={formatText(quote.company.name)} />
                    <TextCopy prefix={"Rut"} data={quote.company.rut} />
                    {quote.company.socialReason !== null ? <TextCopy prefix={"Razón social"} data={formatText(quote.company.socialReason)} /> : null}
                    {quote.company.address && <TextCopy prefix={"Dirección"} data={formatText(quote.company.address)} />}
                    <TextCopy prefix={"Teléfono"} data={"+569" + quote.company.phone} />
                    <TextCopy prefix={"Email"} data={quote.company.email} />
                </Stack>
                <Stack justify={"center"} w={{ base: "100%", md: "50%" }} pt={{ base: 5, md: "0" }}>
                    <Heading size={"md"} color={"Orange"}>Datos de contacto</Heading>
                    <TextCopy prefix={"Nombre"} data={formatText(quote.company.contact.name)} />
                    <TextCopy prefix={"Rut"} data={quote.company.contact.rut} />
                    <TextCopy prefix={"Teléfono"} data={"+569" + quote.company.contact.phone} />
                    <TextCopy prefix={"Email"} data={quote.company.contact.email} />
                    {quote.company.socialReason !== null ? <TagText tag={"Cargo"} data={formatText(quote.company.contact.role)} /> : <TagText tag={"Rol"} data={formatText(quote.company.contact.role)} />}
                </Stack>
            </HStack>
            <Stack>
                <Heading as={"h2"} size={"md"} color={"Orange"} my={5}>Datos de la cotización</Heading>
                <HStack justify={"space-between"} wrap={{ base: "wrap", md: "nowrap" }} align={"flex-start"} w={"full"}>
                    <Stack justify={"center"} w={{ base: "100%", md: "50%" }} >
                        <TextCopy prefix={"Precio Total"} data={`${quote.price} UF`} />
                        <TextCopy prefix={"Formalización del contrato"} data={formatFormalization(quote.formalization)} />
                    </Stack>
                    <Stack justify={"center"} w={{ base: "100%", md: "50%" }} >
                        <TextCopy prefix={"Factura"} data={quote.documents} />
                        <TextCopy prefix={"Pago"} data={formatText(quote.payment)} />
                    </Stack>
                </HStack>
                <TextCopy prefix={"Plazo de entrega"} data={formatText(quote.projectDelivery)} />
                <TextCopy prefix={"Método de pago"} data={formatText(quote.paymentMethod)} />
                <TextCopy prefix={"Descripción"} data={formatText(quote.description)} />
            </Stack>
            <Stack justify={"center"} mt={'10'} mb={'16'}>
                <Heading as={"h2"} fontSize={"3xl"} color="orange" mb={5}>Servicios cotizados</Heading>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
                    {quote.quoteServices.map((quoteService, index) => (
                        <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" bgColor="#3E4550">
                            <Stack justify={"center"} w={{ base: "100%", md: "100%" }} >
                                <Heading as={"h2"} size={"md"} color={"orange"}>{formatText(quoteService.service.name)}</Heading>
                                <TextCopy prefix={"Nombre"} data={formatText(quoteService.service.name)} />
                                <TextCopy prefix={"Tipo de servicio"} data={formatText(quoteService.service.type)} />
                                <Text fontWeight={"bold"}>Descripción:</Text>
                                <Text>{formatText(quoteService.service.description)}</Text>
                                <TextCopy prefix={"Precio"} data={`${quoteService.price} UF`} />
                            </Stack>
                        </Box>
                    ))}
                </Grid>
            </Stack>
        </Container >
    )
}

export default VerCotizacion