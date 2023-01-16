import { Flex, Text, Button, Heading, Box, Tag, TagLabel, HStack } from '@chakra-ui/react'
import { formatDescription, formatPrice, formatTitle, formatType } from '../utils/formatInfo'
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'

const ServiceQuote = ({ id, title, price, description, type, items, setSelectedServices, selectedServices }) => {

    const addToSelected = () => {
        setSelectedServices([...selectedServices, { id, title }])
    }

    const removeFromSelected = () => {
        setSelectedServices(selectedServices.filter(item => item.id !== id))
    }

    return (
        <Box bgColor={"#3E4550"} w="100%" h="100%" borderRadius={20} minH={'full'} >
            <Flex h="100%">
                <Flex flexDir="column" justifyContent="space-between" p={10} >
                    <Box>
                        <Heading as={"h2"} fontWeight={'semibold'} fontSize={'3xl'}>{formatTitle(title)}</Heading>
                        <Box py={3}>
                            <Tag size="lg" borderRadius={'3xl'} py={2} px={3} w={"fit-content"} bgColor={"#FF9F0F"} color={"white"}>
                                <TagLabel fontWeight={'bold'}>$ {formatPrice(price)}</TagLabel>
                            </Tag>
                        </Box>
                        <Text my={1}>{formatDescription(description)}</Text>
                    </Box>
                    <HStack justify={"space-between"} >
                        <Text>{formatType(type)} | {items} Items</Text>
                        {selectedServices.some(item => item.id === id) ?
                            <Button borderRadius={"3xl"} bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} onClick={() => removeFromSelected()}>
                                <HStack align={"center"}>
                                    <AiOutlineDelete size={"20"} fontWeight={"bold"} />
                                    <Text fontWeight={"bold"}>Quitar</Text>
                                </HStack>
                            </Button>
                            :
                            <Button leftIcon={<AiOutlinePlus size={"20"} fontWeight={"bold"} />} borderRadius={"3xl"} bgColor={"#53B6EE"} color="white" _hover={{ bgColor: "#33A7EB" }} onClick={() => addToSelected()}>Agregar</Button>
                        }
                    </HStack>
                </Flex>
            </Flex>
        </Box>
    )
}

export default ServiceQuote