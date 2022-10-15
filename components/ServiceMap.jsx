import React from 'react'
import { Text, HStack, Button, Td, Tr, ListItem, List } from '@chakra-ui/react'

const ServiceMap = ({ services }) => {

    return (
        services.map(service => {
            return (
                <Tr id={service._id}>
                    <Td>{service.name}</Td>
                    <Td>{service.description}</Td>
                    <Td>${service.price}</Td>
                    <Td>
                        <List>{service.item.map(item => {
                            return (
                                <ListItem id={item._id}>
                                    <Text>{item.description}</Text>
                                </ListItem>
                            )
                        })}</List>
                    </Td>
                    <Td>
                        <HStack>
                            <Button colorScheme="blue">Editar</Button>
                            <Button colorScheme="red">Eliminar</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        })
    )
}

export default ServiceMap