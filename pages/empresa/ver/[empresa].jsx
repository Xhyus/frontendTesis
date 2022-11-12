import { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Stack, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import { getCompany } from '../../../data/company'

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
    console.log(company)
    return (
        <Container maxW={"container.lg"}>
            <HStack align={"center"} justify={"center"} mt={10}>
                <Heading>Empresa: {company.name}</Heading>
            </HStack>
            <HStack justify={"space-around"} align={"baseline"} mt={10}>
                <Stack>
                    <Heading size={"md"}>Datos de la empresa</Heading>
                    <Text>Rut: {company.rut}</Text>
                    <Text>Nombre: {company.name}</Text>
                    {company.socialReason && <Text>Razón social: {company.socialReason}</Text>}
                    <Text>Telefono: {company.phone}</Text>
                    <Text>Email: {company.email}</Text>
                    <Text>Dirección: {company.address}</Text>
                </Stack>
                <Stack>
                    <Heading size={"md"}>Datos de contacto</Heading>
                    <Text>Nombre: {company.contact.name}</Text>
                    <Text>Rut: {company.contact.rut}</Text>
                    <Text>Telefono: {company.contact.phone}</Text>
                    <Text>Email: {company.contact.email}</Text>
                    {company.socialReason ? <Text>Cargo: {company.contact.role}</Text> : <Text>Rol: {company.contact.role}</Text>}
                </Stack>
            </HStack>
            <Stack justify={"center"} mt={10}>
                <Heading size={"md"} textAlign={"center"}>Proyectos con nosotros</Heading>
                <Tabs variant="solid-rounded" >
                    <TabList>
                        <Tab>Proyectos en desarrollo</Tab>
                        <Tab>Proyectos finalizados</Tab>
                        <Tab>Cotizaciones activas</Tab>
                        <Tab>Cotizaciones vencidas</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Text>Proyectos en desarrollo</Text>
                        </TabPanel>
                        <TabPanel>
                            <Text>Proyectos finalizados</Text>
                        </TabPanel>
                        <TabPanel>
                            <Text>Cotizaciones activas</Text>
                        </TabPanel>
                        <TabPanel>
                            <Text>Cotizaciones vencidas</Text>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Stack>

        </Container>
    )
}

export default verEmpresa