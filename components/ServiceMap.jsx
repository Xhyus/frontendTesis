import React from 'react'
import { Text, HStack, Button, Td, Tr, ListItem, List } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import deleteServices from '../data/deleteServices'

const ServiceMap = ({ services, setServices }) => {

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
                            setServices(services.filter(service => service._id !== id))
                            console.log(services.filter(service => service._id))
                        })
                    })
            }
        })
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
                            <Button colorScheme="blue">Editar</Button>
                            <Button colorScheme="red" onClick={() => deleteService(service._id)}>Eliminar</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        })
    )
}

export default ServiceMap