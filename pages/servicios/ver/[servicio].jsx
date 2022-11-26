import { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Stack, Tabs, TabList, Tab, TabPanel, TabPanels, ListItem, List, Box } from '@chakra-ui/react';
import { getSpecificService } from '../../../data/services'
import TextCopy from '../../../components/TextCopy';

export async function getServerSideProps(context) {
    try {
        const res = await getSpecificService(context.query.servicio, context.req.headers.cookie)
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

const verServicio = (data) => {
    const [service] = useState(data.data)
    console.log(data)
    return (
        <Container maxW={"container.lg"}>
            <HStack align={"center"} justify={"center"} mt={10}>
                <Heading as={"h1"} >Servicio: {service.name}</Heading>
            </HStack>
            <Stack spacing={10} mt={10}>

                <Box spacing={5} flexDirection="column" justify="space-between">
                    <HStack>
                        <Text>Nombre: {service.name}</Text>
                        <Text>Precio: {service.price}</Text>
                        <Text>Tipo: {service.type}</Text>
                    </HStack>
                    <HStack>
                        <Text>Descripción: {service.description}</Text>
                        <Text>Fecha de creación: {service.createdAt}</Text>
                        <Text>Fecha de actualización: {service.updatedAt}</Text>
                    </HStack>
                </Box>

                <Stack spacing={5}>
                    {service.item.map((item, index) => (
                        <Stack key={index} spacing={5}>
                            <List>
                                <ListItem>{item.description}</ListItem>
                            </List>
                        </Stack>
                    ))}
                </Stack>

            </Stack>

        </Container>
    )
}

export default verServicio