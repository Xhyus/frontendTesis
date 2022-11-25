import React from 'react'
import { Card, Flex, Text, Button, Heading, Box, Tag, TagLabel, HStack } from '@chakra-ui/react'
import { Router } from 'next/router'

const ServiceCard = ({ id, title, price, description, type, items }) => {
    return (
        <Card w={"sm"} borderRadius={20}>
            <Flex flexDirection={"column"} p={'10'}>
                <Heading as={"h2"} fontWeight={'semibold'}>{title}</Heading>
                <Box mb={3} mt={2}>
                    <Tag size="lg" borderRadius={'3xl'} py={2} px={3} w={"fit-content"} bgColor={"#FF9F0F"} color={"white"}>
                        <TagLabel fontWeight={'bold'}>$ {price}</TagLabel>
                    </Tag>
                </Box>
                <Text >{description}</Text>
                <HStack justify={"space-between"} pt={5}>
                    <Text>{type} | {items} items</Text>
                    <Button borderRadius={10} colorScheme="blue" color={"white"} onClick={() => Router.push('/')}>Detalles</Button>
                </HStack>
            </Flex>
        </Card>
    )
}

export default ServiceCard