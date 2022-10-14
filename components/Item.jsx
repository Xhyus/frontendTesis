import React from 'react'
import { Stack, HStack, FormControl, Input, Button, FormLabel } from '@chakra-ui/react'

const Item = ({ id, lastItem, handleDeleteItem, handleChangeItem }) => {
    console.log(id)
    console.log(lastItem)
    const removeItem = (id) => {
        console.log(id)
        if (id + 1 === lastItem && id !== 0) {
            return (
                <Button onClick={() => handleDeleteItem(id)}>Eliminar</Button>
            )
        }
        if (id !== lastItem) {
            return null
        }
    }

    return (
        <FormControl id={id} isRequired py={2}>
            <FormLabel>Item {id + 1}</FormLabel>
            <HStack>
                <Input type="text" name={id} placeholder="Ej: Desarrollo de página web con diseño responsivo" onChange={handleChangeItem} />
                <Button colorScheme="red" onClick={() => removeItem(id)}>Eliminar</Button>
            </HStack>
        </FormControl>
    )
}

export default Item