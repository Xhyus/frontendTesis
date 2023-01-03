import React from 'react'
import { Heading, Stack, Container } from '@chakra-ui/react'

const Error404 = () => {
    return (
        <Container maxW="container.md" h={"full"} w={'full'} >
            <Stack spacing={4} align={"center"} justify={"center"}>
                <Heading as="h1" size="xl" textAlign={"center"}>Error 404</Heading>
                <Heading as="h2" size="md" textAlign={"center"}>Página no encontrada</Heading>
            </Stack>
        </Container>
    )
}

export default Error404