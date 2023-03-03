import { useState, useEffect } from 'react'
import { Heading, Button, Container, HStack, Stack, ListItem, UnorderedList, Tag, TagLeftIcon, Center, Spinner, TagLabel } from '@chakra-ui/react';
import { getSpecificService, deleteServices } from '../../../data/services'
import { formatDate, formatPrice, formatServiceType, formatText } from '../../../utils/formatInfo';
import TagText from '../../../components/TagText';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import { FaCalendarPlus, FaCalendarTimes } from 'react-icons/fa';

const VerServicio = ({ servicio }) => {
    const [service, setService] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage?.getItem('token')
                const res = await getSpecificService(servicio, token)
                setService(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                router.push(
                    '/servicios', {
                    pathname: '/servicios',
                    permanent: true
                })
            }
        }
        fetchData()
    }, [])


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
                    let token = localStorage?.getItem('token')
                    deleteServices(service._id, token).then(() => {
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
    if (loading) {
        return (
            <Center h="90vh">
                <Spinner />
            </Center>
        )
    }

    return (
        <Container maxW={"container.lg"}>
            <HStack align={"center"} justify={"center"} mt={10}>
                <Tag size={"lg"} colorScheme={"green"} variant="solid">
                    <TagLeftIcon as={FaCalendarPlus} boxSize="12px" />
                    <TagLabel>{formatDate(service.created)}</TagLabel>
                </Tag>
                <Tag size={"lg"} colorScheme={"orange"} variant="solid">
                    <TagLeftIcon as={FaCalendarTimes} boxSize="12px" />
                    <TagLabel>{formatDate(service.updated)}</TagLabel>
                </Tag>
            </HStack>
            <Heading as={"h1"} my={10} fontSize={"6xl"}  >Servicio: {service.name}</Heading>
            <Stack>
                <Stack spacing={5} flexDirection="column" justify="space-between">
                    <TagText tag="Nombre" data={formatText(service.name)} />
                    <TagText tag="Precio" data={formatPrice(service.price) + " UF"} />
                    <TagText tag="Tipo" data={formatServiceType(service.type)} />
                    <TagText tag="Descripción" data={service.description} />
                </Stack>
                <Stack spacing={5}>
                    <Heading as={"h2"}>Ítems contemplados</Heading>
                    <Stack spacing={5}>
                        <UnorderedList>
                            {service.item.map((item, index) => (
                                <ListItem key={index}>{item.description}</ListItem>
                            ))}
                        </UnorderedList>
                    </Stack>
                </Stack>
                <HStack py={5}>
                    <Button bgColor={"#FF9F0F"} color="white" _hover={{ bgColor: "#F59300" }} w={"full"} variant="solid" onClick={() => router.push(`/servicios/${service._id}`)}>Editar</Button>
                    <Button bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} w={"full"} variant="solid" onClick={deleteButton}>Eliminar</Button>
                    <Button bgColor={"#53B6EE"} color="white" _hover={{ bgColor: "#33A7EB" }} w={"full"} variant="solid" onClick={() => router.push('/servicios')}>Volver a servicios</Button>
                </HStack>
            </Stack>
        </Container>
    )
}

VerServicio.getInitialProps = async (ctx) => {
    return { servicio: ctx.query.servicio }
}

export default VerServicio