import { useEffect, useState, useRef } from 'react'
import { Text, HStack, Button, Td, Tr, ListItem, List, useDisclosure, FormControl, Input, FormLabel } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import deleteServices from '../data/deleteServices'
import { useRouter } from 'next/router'
import EditModal from './EditModal'

const ServiceMap = ({ services }) => {
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

    const editService = (id) => {
        router.push(`/servicios/${id}`)
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
                            <Button colorScheme="blue" onClick={() => editService(service._id)}>Editar</Button>
                            <Button colorScheme="red" onClick={() => deleteService(service._id)}>Eliminar</Button>
                        </HStack>
                        {/* <EditModal setIsOpen={setIsOpen} isOpen={isOpen} initialRef={initialRef} finalRef={finalRef} /> */}
                    </Td>
                </Tr>
            )
        })
    )
}

export default ServiceMap