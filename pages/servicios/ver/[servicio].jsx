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

                <HStack spacing={5} flexDirection="column" justify="space-between">
                    <Stack>
                        <HStack>
                            <Text>Nombre: </Text>
                            <Text>{service.name}</Text>
                        </HStack>
                        <HStack>
                            <Text>Precio: </Text>
                            <Text>{service.price}</Text>
                        </HStack>
                        <HStack>
                            <Text>Descripción: </Text>
                            <Text>{service.description}</Text>
                        </HStack>
                    </Stack>
                    <Stack>
                        <HStack>
                            <Text>Fecha de creación: </Text>
                            <Text>{service.createdAt}</Text>
                        </HStack>
                        <HStack>
                            <Text>Fecha de actualización: </Text>
                            <Text>{service.updatedAt}</Text>
                        </HStack>
                        <HStack>
                            <Text>Tipo: </Text>
                            <Text>{service.type}</Text>
                        </HStack>

                    </Stack>
                </HStack>

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