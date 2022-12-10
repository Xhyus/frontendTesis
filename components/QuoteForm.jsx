import React from 'react'
import { Formik } from 'formik'
import { Container, Heading, Stack, FormControl, FormLabel, Input, Button, HStack } from '@chakra-ui/react'

const QuoteForm = ({ setStep, quote, setQuote }) => {
    return (
        <Container maxW={"container.md"} centerContent>
            <Heading mt={10} mb={5} fontSize={'6xl'}>Crear Cotización</Heading>
            <Stack w={"full"}>
                <FormControl id="name" isRequired>
                    <FormLabel>Nombre</FormLabel>
                    <Input type="text" />
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Correo</FormLabel>
                    <Input type="email" />
                </FormControl>
            </Stack>
            <HStack my={5}>
                <Button color={"white"} bgColor={"#7ABC63"}>Ir al siguiente paso</Button>
                <Button color={"white"} bgColor={"#DE1A1A"} onClick={() => setStep(1)}>Atras</Button>
            </HStack>
        </Container >
    )
}

export default QuoteForm