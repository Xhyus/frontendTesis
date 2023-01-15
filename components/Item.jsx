import { Tooltip, HStack, FormControl, Input, Button, FormLabel } from '@chakra-ui/react'

const Item = ({ id, lastItem, handleDeleteItem, handleChangeItem, value }) => {
    const removeItem = () => {
        if (id + 1 === lastItem && id !== 0) {
            return (
                <Button onClick={() => handleDeleteItem(id)} colorScheme="red">Eliminar</Button>
            )
        }
        if (id !== lastItem) {
            return null
        }
    }

    return (
        <FormControl id={id} isRequired py={2}>
            <FormLabel>Ítem {id + 1}</FormLabel>
            <HStack>
                <Tooltip label="Ej: Diseño responsivo para teléfonos y tablets" aria-label="Ej: Diseño responsivo para teléfonos y tablets">
                    <Input type="text" name={id} value={value} placeholder="Ej: Diseño responsivo para teléfonos y tablets" onChange={handleChangeItem} />
                </Tooltip>
                {removeItem()}
            </HStack>
        </FormControl>
    )
}

export default Item