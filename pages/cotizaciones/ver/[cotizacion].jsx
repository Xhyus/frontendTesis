import { Heading, Button, Container, HStack, Stack, Tabs, TabList, Tab, TabPanel, TabPanels, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import { getQuote, deleteQuote } from '../../../data/quotes'
import { useRouter } from 'next/router'
import TextCopy from '../../../components/TextCopy'
import { FaCalendarTimes, FaCalendarPlus } from 'react-icons/fa'
import { formatDate, formatFormalization, formatTitleDetail, formatText } from '../../../utils/formatInfo'
import Swal from 'sweetalert2'

export async function getServerSideProps(context) {
    try {
        const res = await getQuote(context.query.cotizacion, context.req.headers.cookie)
        return {
            props: {
                quote: res.data
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
            await deleteQuote(quote._id)
            await Swal.fire({
                title: 'Cotización eliminada',
                text: 'La cotización ha sido eliminada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
            router.push('/cotizaciones')
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
            <Heading as={"h1"} my={10} fontSize={'6xl'}>{formatTitleDetail(quote.name)}</Heading>
            <HStack mb={5}>
                <Button bgColor={"#53B6EE"} color="white" _hover={{ bgColor: "#33A7EB" }} w="full" onClick={() => router.push('/cliente/cotizacion/' + quote.url)}>Ver cotización</Button>
                <Button bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} w="full" onClick={() => handleDelete()}>Eliminar cotización</Button>
            </HStack>
            <HStack justify={"space-between"} wrap={{ base: "wrap", md: "nowrap" }} align={"flex-start"} w={"full"}>
                <Stack justify={"center"} w={{ base: "100%", md: "50%" }} >
                    <Heading size={"md"} color={"Orange"}>Datos de la empresa</Heading>
                    <TextCopy prefix={"Nombre"} data={formatText(quote.company.name)} />
                    <TextCopy prefix={"Rut"} data={quote.company.rut} />
                    {quote.company.socialReason && <TextCopy prefix={"Razón social"} data={formatText(quote.company.socialReason)} />}
                    {quote.company.address && <TextCopy prefix={"Dirección"} data={formatText(quote.company.address)} />}
                    <TextCopy prefix={"Teléfono"} data={quote.company.contact.phone} />
                    <TextCopy prefix={"Email"} data={quote.company.contact.email} />
                </Stack>
                <Stack justify={"center"} w={{ base: "100%", md: "50%" }} pt={{ base: 5, md: "0" }}>
                    <Heading size={"md"} color={"Orange"}>Datos de contacto</Heading>
                    <TextCopy prefix={"Nombre"} data={formatText(quote.company.contact.name)} />
                    <TextCopy prefix={"Rut"} data={quote.company.contact.rut} />
                    <TextCopy prefix={"Teléfono"} data={quote.company.contact.phone} />
                    <TextCopy prefix={"Email"} data={quote.company.contact.email} />
                    {quote.company.contact.socialReason ? <TextCopy prefix={"Cargo"} data={formatText(quote.company.contact.role)} /> : <TextCopy prefix={"Rol"} data={formatText(quote.company.contact.role)} />}
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
                <TextCopy prefix={"Metodo de pago"} data={formatText(quote.paymentMethod)} />
                <TextCopy prefix={"Descripción"} data={formatText(quote.description)} />
            </Stack>
            <Stack justify={"center"} mt={'10'} mb={'16'}>
                <Heading as={"h2"} size={"md"} textAlign={"center"} mb={5}>Servicios cotizados</Heading>
                <Tabs variant="enclosed">
                    <TabList>
                        {quote.quoteServices.map((quoteService, index) => (
                            <Tab key={index}>{formatText(quoteService.service.name)}</Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {quote.quoteServices.map((quoteService, index) => (
                            <TabPanel key={index} >
                                <Stack justify={"center"} w={{ base: "100%", md: "100%" }} >
                                    <TextCopy prefix={"Nombre"} data={formatText(quoteService.service.name)} />
                                    <TextCopy prefix={"Tipo de servicio"} data={formatText(quoteService.service.type)} />
                                    <TextCopy prefix={"Descripción"} data={formatText(quoteService.service.description)} />
                                    <TextCopy prefix={"Precio"} data={`$${quoteService.price} CLP`} />
                                </Stack>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Stack>
        </Container >
    )
}

export default VerCotizacion