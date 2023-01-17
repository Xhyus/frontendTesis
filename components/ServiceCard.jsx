import { Flex, Text, Button, Heading, Box, Tag, TagLabel, HStack } from '@chakra-ui/react'
import { formatDescription, formatPrice, formatTitle, formatType } from '../utils/formatInfo'

const ServiceCard = ({ id, title, price, description, type, items, message, func }) => {
    return (
        <Box bgColor={"#3E4550"} w="100%" h="100%" borderRadius={20} minH={'full'} >
            <Flex h="100%">
                <Flex flexDir="column" justifyContent="space-between" p={10} >
                    <Box>
                        <Heading as={"h2"} fontWeight={'semibold'} fontSize={'3xl'}>{formatTitle(title)}</Heading>
                        <Box py={3}>
                            <Tag size="lg" borderRadius={'3xl'} py={2} px={3} w={"fit-content"} bgColor={"#FF9F0F"} color={"white"}>
                                <TagLabel fontWeight={'bold'}>{formatPrice(price)} UF</TagLabel>
                            </Tag>
                        </Box>
                        <Text my={1}>{formatDescription(description)}</Text>
                    </Box>
                    <HStack justify={"space-between"} >
                        <Text>{formatType(type)} | {items} {items > 1 ? 'Items' : "Item"}</Text>
                        <Button borderRadius={10} bgColor={"#53B6EE"} color="white" _hover={{ bgColor: "#33A7EB" }} onClick={() => func(id)}>{message}</Button>
                    </HStack>
                </Flex>
            </Flex>
        </Box>
    )
}

export default ServiceCard