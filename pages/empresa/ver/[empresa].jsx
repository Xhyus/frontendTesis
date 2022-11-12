import { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Stack, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import { getCompany } from '../../../data/company'
import TextCopy from '../../../components/TextCopy';

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

const verEmpresa = (data) => {
    const [company] = useState(data.data)
    return (
        <Container maxW={"container.lg"}>
            <HStack align={"center"} justify={"center"} mt={10}>
                <Heading as={"h1"} >Empresa: {company.name}</Heading>
            </HStack>
            <HStack justify={"center"} wrap={{ base: "wrap", md: "nowrap" }} align={"flex-start"} mt={10} w={"full"}>
                <Stack justify={"center"} w={{ base: "100%", md: "50%" }}>
                    <Heading size={"md"}>Datos de la empresa</Heading>
                    <TextCopy prefix={"Rut"} data={company.rut} />
                    <Text>Rut: {company.rut}</Text>
                    <Text>Nombre: {company.name}</Text>
                    {company.socialReason && <Text>Razón social: {company.socialReason}</Text>}
                    <Text>Telefono: {company.phone}</Text>
                    <Text>Email: {company.email}</Text>
                    <Text>Dirección: {company.address}</Text>
                </Stack>
                <Stack justify={"center"} w={{ base: "100%", md: "50%" }} pt={{ base: 5, md: "0" }}>
                    <Heading size={"md"}>Datos de contacto</Heading>
                    <Text>Nombre: {company.contact.name}</Text>
                    <Text>Rut: {company.contact.rut}</Text>
                    <Text>Telefono: {company.contact.phone}</Text>
                    <Text>Email: {company.contact.email}</Text>
                    {company.socialReason ? <Text>Cargo: {company.contact.role}</Text> : <Text>Rol: {company.contact.role}</Text>}
                </Stack>
            </HStack>
            <Stack justify={"center"} mt={'10'}>
                <Heading as={"h2"} size={"md"} textAlign={"center"} mb={5}>Cotizaciones</Heading>
                <Tabs isFitted orientation={{ base: "horizontal", md: "horizontal" }} variant="solid-rounded">
                    <TabList>
                        <Tab>Cotizaciones activas</Tab>
                        <Tab>Cotizaciones vencidas</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Text>Cotizaciones activas</Text>
                        </TabPanel>
                        <TabPanel>
                            <Text>Cotizaciones vencidas</Text>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Stack>
            <Stack mt={10} mb={'28'}>
                <Heading as={"h2"} size={"md"} textAlign={"center"} mb={5}>Proyectos</Heading>
                <Tabs isFitted orientation={{ base: "horizontal", md: "horizontal" }} variant="solid-rounded">
                    <TabList>
                        <Tab>Proyectos activos</Tab>
                        <Tab>Proyectos terminados</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Text>Proyectos activos</Text>
                        </TabPanel>
                        <TabPanel>
                            <Text>Proyectos terminados</Text>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Stack>

        </Container>
    )
}

export default verEmpresa