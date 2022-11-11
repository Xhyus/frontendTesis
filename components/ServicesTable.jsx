import { Text, HStack, Button, Td, Tr, ListItem, List } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { deleteServices } from '../data/services'
import { useRouter } from 'next/router'

const ServicesTable = ({ services }) => {
    const router = useRouter()

    const deleteService = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteServices(id)
                    .then(() => {
                        Swal.fire(
                            '¡Borrado!',
                            'El servicio ha sido borrado.',
                            'success'
                        ).then(() => {
                            window.location.reload()
                        })
                    })
            }
        })
    }

    if (services.length === 0) {
        return (
            <Tr>
                <Td colSpan="5">
                    <Text fontSize="xl" textAlign="center">No se ha encontrado ningún servicio con los datos ingresados</Text>
                </Td>
            </Tr>
        )
    }

    return (
        services.map(service => {
            return (
                <Tr key={service._id}>
                    <Td>{service.name}</Td>
                    <Td>{service.description}</Td>
                    <Td>${service.price}</Td>
                    <Td>
                        <List>{service.item.map(item => {
                            return (
                                <ListItem key={item._id}>
                                    <Text>{item.description}</Text>
                                </ListItem>
                            )
                        })}</List>
                    </Td>
                    <Td>
                        <HStack>
                            {/* <Button colorScheme="yellow" onClick={() => deleteService(service._id)}>Ver más</Button> */}
                            <Button colorScheme="blue" onClick={() => router.push(`/servicios/${service._id}`)}>Editar</Button>
                            <Button colorScheme="red" onClick={() => deleteService(service._id)}>Eliminar</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        })
    )
}

export default ServicesTable