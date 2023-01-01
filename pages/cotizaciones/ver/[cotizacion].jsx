import { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Stack, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import { getQuote } from '../../../data/quotes'
import { useRouter } from 'next/router'
import TextCopy from '../../../components/TextCopy'
import { formatDate, formatFormalization, formatPrice, formatTitleDetail, formatText } from '../../../utils/formatInfo'

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

const verCotizacion = ({ quote }) => {
    const router = useRouter()
    console.log(quote)

    return (
        <Container maxW={"container.lg"}>
            <HStack align={"center"} justify={"center"} my={10}>
                <Heading as={"h1"}>Cotización: {formatTitleDetail(quote.name)}</Heading>
            </HStack>
            {/* <Button colorScheme={"orange"} mb={10} onClick={() => router.push('/empresa/editar/' + quote.company._id)}>Editar datos</Button> */}
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
                        <TextCopy prefix={"Servicios Cotizados"} data={quote.quoteServices.length} />
                        <TextCopy prefix={"Total"} data={`$${quote.price} CLP`} />
                        <TextCopy prefix={"Formalización del contrato"} data={formatFormalization(quote.formalization)} />
                        <TextCopy prefix={"Pago"} data={formatText(quote.payment)} />
                    </Stack>
                    <Stack justify={"center"} w={{ base: "100%", md: "50%" }} >
                        <TextCopy prefix={"Factura"} data={quote.documents} />
                        <TextCopy prefix={"Fecha de creación"} data={formatDate(quote.created)} />
                        <TextCopy prefix={"Fecha de vencimiento"} data={formatDate(quote.end)} />
                        <TextCopy prefix={"Última actualización"} data={formatDate(quote.updated)} />
                    </Stack>
                </HStack>
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
                                <Stack justify={"center"} w={{ base: "100%", md: "50%" }} >
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

export default verCotizacion