import { useEffect, useState } from 'react'
import { Heading, Button, Container, HStack, Text, Stack, Tabs, TabList, Tab, TabPanel, TabPanels, Center, Spinner } from '@chakra-ui/react';
import { getCompany, deleteCompany } from '../../../data/company'
import TextCopy from '../../../components/TextCopy';
import TagText from '../../../components/TagText';
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';


const VerEmpresa = ({ empresa }) => {
    const [company, setCompany] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getData = async () => {
            try {
                let token = localStorage?.getItem('token')
                const res = await getCompany(empresa, token)
                setCompany(res.data)
                setLoading(false)
            } catch (error) {
                router.push('/')
            }
        }
        getData()
    }, [])
    const handleDelete = async () => {
        try {
            await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let token = localStorage?.getItem('token')
                    await deleteCompany(empresa, token)
                    router.push('/empresas')
                }
            })
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error al eliminar la empresa',
            })
        }
    }
    if (loading) {
        return (
            <Center h="95vh"   >
                <Spinner size="xl" />
            </Center>
        )
    }

    return (
        <Container maxW={"container.lg"}>
            <Heading as={"h1"} my={10} fontSize={'6xl'} >Empresa: {company.name}</Heading>
            <HStack mb={10} w="full">
                <Button w="full" bgColor={"#FF9F0F"} color="white" _hover={{ bgColor: "#F59300" }} onClick={() => router.push('/empresa/editar/' + company._id)}>Editar datos</Button>
                <Button w="full" bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} onClick={() => handleDelete(company._id)}>Eliminar empresa</Button>
            </HStack>
            <HStack justify={"center"} wrap={{ base: "wrap", md: "nowrap" }} align={"flex-start"} w={"full"}>
                <Stack justify={"center"} w={{ base: "100%", md: "50%" }} >
                    <Heading size={"md"}>Datos de la empresa</Heading>
                    <TextCopy prefix={"Nombre"} data={company.name} />
                    <TextCopy prefix={"Rut"} data={company.rut} />
                    {company.socialReason !== null ? <TextCopy prefix={"Razón social"} data={company.socialReason} /> : null}
                    {company.address && <TextCopy prefix={"Dirección"} data={company.address} />}
                    <TextCopy prefix={"Teléfono"} data={"+569" + company.phone} />
                    <TextCopy prefix={"Email"} data={company.email} />
                </Stack>
                <Stack justify={"center"} w={{ base: "100%", md: "50%" }} pt={{ base: 5, md: "0" }}>
                    <Heading size={"md"}>Datos de contacto</Heading>
                    <TextCopy prefix={"Nombre"} data={company.contact.name} />
                    <TextCopy prefix={"Rut"} data={company.contact.rut} />
                    <TextCopy prefix={"Teléfono"} data={"+569" + company.contact.phone} />
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
                                        <Button w={"30%"} bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} onClick={() => router.push('/cotizaciones/ver/' + quote._id)}>Ver</Button>
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
                                        <Button w={"30%"} bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} onClick={() => router.push('/cotizaciones/ver/' + quote._id)}>Ver</Button>
                                    </HStack>
                                )
                            })}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Stack>
        </Container>
    )
}

VerEmpresa.getInitialProps = async (ctx) => {
    return { empresa: ctx.query.empresa }
}
export default VerEmpresa