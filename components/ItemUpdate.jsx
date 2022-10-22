import React from 'react'
import { Tooltip, HStack, FormControl, Input, Button, FormLabel } from '@chakra-ui/react'

const ItemUpdate = ({ id, lastItem, handleDeleteItem, handleChangeItem, value }) => {

    return (
        <FormControl id={id} isRequired py={2}>
            <FormLabel>Ítem {id + 1}</FormLabel>
            <HStack>
                <Tooltip label="Ej: Diseño responsivo para teléfonos y tablets" aria-label="Ej: Diseño responsivo para teléfonos y tablets">
                    <Input type="text" name={id} value={value} placeholder="Ej: Diseño responsivo para teléfonos y tablets" onChange={handleChangeItem} />
                </Tooltip>
                <Button onClick={() => handleDeleteItem(id)} colorScheme="red">Eliminar</Button>
            </HStack>
        </FormControl>
    )
}

export default ItemUpdate