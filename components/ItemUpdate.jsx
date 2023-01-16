import { Tooltip, HStack, FormControl, Input, Icon, FormLabel } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'

const ItemUpdate = ({ id, handleDeleteItem, handleChangeItem, value }) => {
    return (
        <FormControl id={id} isRequired py={2}>
            <FormLabel>Ítem {id + 1}</FormLabel>
            <HStack>
                <Tooltip label="Ej: Diseño responsivo para teléfonos y tablets" aria-label="Ej: Diseño responsivo para teléfonos y tablets">
                    <Input type="text" name={id} value={value} placeholder="Ej: Diseño responsivo para teléfonos y tablets" onChange={handleChangeItem} />
                </Tooltip>
                <Icon as={FaTrashAlt} _hover={{ color: "#A82428" }} cursor="pointer" onClick={() => handleDeleteItem(id)} />
            </HStack>
        </FormControl>
    )
}

export default ItemUpdate