import { Card, Flex, Text, Button, Heading, Box, Tag, TagLabel, HStack } from '@chakra-ui/react'
import { formatDescription, formatPrice, formatTitle, formatType } from '../utils/formatInfo'

const ServiceCard = ({ id, title, price, description, type, items, message, func }) => {
    return (
        <Card w={{ base: "100%", md: "sm" }} minW={{ base: "md", md: "sm" }} minH="2xs" h="full" borderRadius={20}>
            <Flex flexDirection={"column"} p={'10'} justify="space-between">
                <Heading as={"h2"} fontWeight={'semibold'} fontSize={'3xl'}>{formatTitle(title)}</Heading>
                <Box mb={3} mt={2}>
                    <Tag size="lg" borderRadius={'3xl'} py={2} px={3} w={"fit-content"} bgColor={"#FF9F0F"} color={"white"}>
                        <TagLabel fontWeight={'bold'}>$ {formatPrice(price)}</TagLabel>
                    </Tag>
                </Box>
                <Text >{formatDescription(description)}</Text>
                <HStack justify={"space-between"} pt={5}>
                    <Text>{formatType(type)} | {items} Items</Text>
                    <Button borderRadius={10} bgColor={"#53B6EE"} color="white" _hover={{ bgColor: "#33A7EB" }} onClick={() => func(id)}>{message}</Button>
                </HStack>
            </Flex>
        </Card>
    )
}

export default ServiceCard