import { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Stack, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import { getCompany } from '../../../data/company'
import TextCopy from '../../../components/TextCopy';
import TagText from '../../../components/TagText';
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    try {
        const res = await getCompany(context.query.empresa, context.req.headers.cookie)
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

const VerEmpresa = (data) => {
    const [company] = useState(data.data)
    const router = useRouter()
    return (
        <Container maxW={"container.lg"}>
            <Heading as={"h1"} my={10} fontSize={'6xl'} >Empresa: {company.name}</Heading>
            <Button bgColor={"#FF9F0F"} color="white" _hover={{ bgColor: "#F59300" }} mb={10} onClick={() => router.push('/empresa/editar/' + company._id)}>Editar datos</Button>
            <HStack justify={"center"} wrap={{ base: "wrap", md: "nowrap" }} align={"flex-start"} w={"full"}>
                <Stack justify={"center"} w={{ base: "100%", md: "50%" }} >
                    <Heading size={"md"}>Datos de la empresa</Heading>
                    <TextCopy prefix={"Nombre"} data={company.name} />
                    <TextCopy prefix={"Rut"} data={company.rut} />
                    {company.socialReason && <TextCopy prefix={"Razón social"} data={company.socialReason} />}
                    {company.address && <TextCopy prefix={"Dirección"} data={company.address} />}
                    <TextCopy prefix={"Teléfono"} data={company.contact.phone} />
                    <TextCopy prefix={"Email"} data={company.contact.email} />
                </Stack>
                <Stack justify={"center"} w={{ base: "100%", md: "50%" }} pt={{ base: 5, md: "0" }}>
                    <Heading size={"md"}>Datos de contacto</Heading>
                    <TextCopy prefix={"Nombre"} data={company.contact.name} />
                    <TextCopy prefix={"Rut"} data={company.contact.rut} />
                    <TextCopy prefix={"Teléfono"} data={company.contact.phone} />
                    <TextCopy prefix={"Email"} data={company.contact.email} />
                    {company.contact.socialReason ? <TagText tag={"Cargo"} data={company.contact.role} /> : <TagText tag={"Rol"} data={company.contact.role} />}
                </Stack>
            </HStack>
            <Stack justify={"center"} mt={'10'}>
                <Heading as={"h2"} size={"md"} textAlign={"center"} mb={5}>Cotizaciones</Heading>
                <Tabs isFitted orientation={{ base: "horizontal", md: "horizontal" }} pb={10} variant="solid-rounded">
                    <TabList>
                        <Tab bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }}>Activas</Tab>
                        <Tab bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} >Vencidas</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {company.validQuote.length === 0 && <Text py={5}>No hay cotizaciones activas</Text>}
                            {company.validQuote.map((quote, index) => {
                                return (
                                    <HStack w={"full"} py={5} key={index}>
                                        <Text w={"full"}>{quote.name}</Text>
                                        <Button w={"30%"} bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} onClick={() => router.push('/cotizacion/ver/' + quote._id)}>Ver</Button>
                                    </HStack>
                                )
                            })}
                        </TabPanel>
                        <TabPanel>
                            {company.expiredQuote.length === 0 && <Text py={5}>No hay cotizaciones vencidas</Text>}
                            {company.expiredQuote.map((quote, index) => {
                                return (
                                    <HStack w={"full"} py={5} key={index}>
                                        <Text w={"full"}>{quote.name}</Text>
                                        <Button w={"30%"} bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} onClick={() => router.push('/cotizacion/ver/' + quote._id)}>Ver</Button>
                                    </HStack>)
                            })}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Stack>
        </Container>
    )
}

export default VerEmpresa