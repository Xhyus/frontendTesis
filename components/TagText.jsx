import { HStack, Text } from '@chakra-ui/react'

const TagText = ({ tag, data }) => {
    return (
        <HStack align={"start"}>
            <Text fontWeight={'bold'}>{tag}: </Text>
            <Text>{data === undefined || data === null || data === '' ? 'Aún no se han ingresado datos.' : data}</Text>
        </HStack>
    )
}

export default TagText