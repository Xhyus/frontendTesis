import { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Stack, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import { getCompany } from '../../../data/company'
import TextCopy from '../../../components/TextCopy';
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

const verEmpresa = (data) => {
    console.log(data)
    const [company] = useState(data.data)
    const router = useRouter()

    return (
        <Container maxW={"container.lg"}>
            <HStack align={"center"} justify={"center"} my={10}>
                <Heading as={"h1"} >Empresa: {company.name}</Heading>
            </HStack>
            <Button colorScheme={"orange"} mb={10} onClick={() => router.push('/empresa/editar/' + company._id)}>Editar datos</Button>
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
                    {company.contact.socialReason ? <Text>Cargo : {company.contact.role} </Text> : <Text>Rol : {company.contact.role} </Text>}
                </Stack>
            </HStack>
            <Stack justify={"center"} mt={'10'}>
                <Heading as={"h2"} size={"md"} textAlign={"center"} mb={5}>Cotizaciones</Heading>
                <Tabs isFitted orientation={{ base: "horizontal", md: "horizontal" }} variant="solid-rounded">
                    <TabList>
                        <Tab>Activas</Tab>
                        <Tab>Vencidas</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Text>Activas</Text>
                        </TabPanel>
                        <TabPanel>
                            <Text>Vencidas</Text>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Stack>
            <Stack mt={10} mb={'28'}>
                <Heading as={"h2"} size={"md"} textAlign={"center"} mb={5}>Proyectos</Heading>
                <Tabs isFitted orientation={{ base: "horizontal", md: "horizontal" }} variant="solid-rounded">
                    <TabList>
                        <Tab>Activos</Tab>
                        <Tab>Terminados</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Text>Activos</Text>
                        </TabPanel>
                        <TabPanel>
                            <Text>Terminados</Text>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Stack>
        </Container>
    )
}

export default verEmpresa