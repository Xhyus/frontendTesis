import { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Stack, Tabs, TabList, Tab, TabPanel, TabPanels, ListItem, List, Box, UnorderedList } from '@chakra-ui/react';
import { getSpecificService, deleteServices } from '../../../data/services'
import { formatDate } from '../../../utils/formatInfo';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'

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

const VerServicio = (data) => {
    const [service] = useState(data.data)
    console.log(data)
    const router = useRouter()

    const deleteButton = () => {
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
                try {
                    deleteServices(service._id).then(() => {
                        Swal.fire({
                            title: 'Eliminado',
                            text: 'El servicio ha sido eliminado',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }
                        )
                        router.push('/servicios')
                    })
                } catch (error) {
                    Swal.fire(
                        'Error',
                        'Ha ocurrido un error al eliminar el servicio.',
                        'error'
                    )
                }
            }
        })
    }

    return (
        <Container maxW={"container.lg"}>
            <HStack align={"center"} justify={"center"} mt={10}>
                <Heading as={"h1"} >Servicio: {service.name}</Heading>
            </HStack>
            <Stack spacing={10} mt={10}>
                <Stack spacing={5} flexDirection="column" justify="space-between">
                    <HStack>
                        <Text>Nombre: </Text>
                        <Text>{service.name}</Text>
                    </HStack>
                    <HStack>
                        <Text>Precio: </Text>
                        <Text>{service.price} UFs</Text>
                    </HStack>
                    <HStack>
                        <Text>Fecha de creación: </Text>
                        <Text>{formatDate(service.created)}</Text>
                    </HStack>
                    <HStack>
                        <Text>Ultima actualización: </Text>
                        <Text>{formatDate(service.updated)}</Text>
                    </HStack>
                    <HStack>
                        <Text>Tipo: </Text>
                        <Text>{service.type}</Text>
                    </HStack>
                    <HStack>
                        <Text>{service.description}</Text>
                    </HStack>
                </Stack>
                <Stack spacing={5}>
                    <Heading as={"h2"}>Items contemplados</Heading>
                    <Stack spacing={5}>
                        <UnorderedList>
                            {service.item.map((item, index) => (
                                <ListItem key={index}>{item.description}</ListItem>
                            ))}
                        </UnorderedList>
                    </Stack>
                </Stack>
                <HStack>
                    <Button colorScheme="orange" w={"full"} variant="solid" onClick={() => router.push(`/servicios/${service._id}`)}>Editar</Button>
                    <Button colorScheme="red" w={"full"} variant="solid" onClick={deleteButton}>Eliminar</Button>
                    <Button colorScheme="blue" w={"full"} variant="solid" onClick={() => router.push('/servicios')}>Volver a servicios</Button>
                </HStack>
            </Stack>
        </Container>
    )
}

export default VerServicio