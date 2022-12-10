import React from 'react'
import { Card, Flex, Text, Button, Heading, Box, Tag, TagLabel, HStack } from '@chakra-ui/react'
import { formatDescription, formatPrice, formatTitle, formatType } from '../utils/formatInfo'
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'

const ServiceQuote = ({ id, title, price, description, type, items, setSelectedServices, selectedServices }) => {

    const addToSelected = () => {
        setSelectedServices([...selectedServices, id])
    }

    const removeFromSelected = () => {
        setSelectedServices(selectedServices.filter(item => item !== id))
    }

    return (
        <Card w={{ base: "full", md: "sm" }} h="full" borderRadius={20}>
            <Flex flexDirection={"column"} p={'10'}>
                <Heading as={"h2"} fontWeight={'semibold'} fontSize={'3xl'}>{formatTitle(title)}</Heading>
                <Box mb={3} mt={2}>
                    <Tag size="lg" borderRadius={'3xl'} py={2} px={3} w={"fit-content"} bgColor={"#FF9F0F"} color={"white"}>
                        <TagLabel fontWeight={'bold'}>$ {formatPrice(price)}</TagLabel>
                    </Tag>
                </Box>
                <Text >{formatDescription(description)}</Text>
                <HStack justify={"space-between"} pt={5}>
                    <Text>{formatType(type)} | {items} Items</Text>
                    {selectedServices.some(item => item === id) ?
                        <Button borderRadius={"3xl"} bgColor={"#DE1A1A"} color="white" onClick={() => removeFromSelected()}>
                            <HStack align={"center"}>
                                <AiOutlineDelete size={"20"} fontWeight={"bold"} />
                                <Text fontWeight={"bold"}>Quitar</Text>
                            </HStack>
                        </Button>
                        :
                        <Button borderRadius={"3xl"} bgColor={"#53B6EE"} color={"white"} onClick={() => addToSelected()}>
                            <HStack align={"center"}>
                                <AiOutlinePlus size={"20"} fontWeight={"bold"} />
                                <Text fontWeight={"bold"}>Agregar</Text>
                            </HStack>
                        </Button>
                    }
                </HStack>
            </Flex>
        </Card>
    )
}

export default ServiceQuote