import React from 'react'
import SearchLook from './SearchLook'
import { Container, Heading, Wrap, Stack, Text, Button, HStack } from '@chakra-ui/react'

const AddServices = ({ services, selectedServices, cardList, setSearchTerm, searchTerm, setSearch, setStep, step, filter, filteredServices }) => {
    return (
        <>
            <Container maxW={"container.xl"} centerContent>
                <Heading mt={10} mb={5} fontSize={'6xl'}>Crear Cotización</Heading>
                <SearchLook setSearchTerm={setSearchTerm} searchTerm={searchTerm} setSearch={setSearch} text={"Ver cotización"} setStep={setStep} step={step} />
                <Wrap spacing={10} justify={{ base: "center", md: "normal" }} pb={20}>
                    {cardList(filter ? filteredServices : services)}
                </Wrap>
            </Container >
            {selectedServices.length > 0 &&
                <Stack position="sticky" bottom={0} w="full" p={4} bg="blue.800">
                    <HStack justify={"space-around"}>
                        <Text fontWeight={"bold"}>Se han añadido {selectedServices.length} servicios a la cotizacion </Text>
                        <Button color={"white"} bgColor={"#7ABC63"} borderRadius={'3xl'} onClick={() => setStep(2)}>Ir al siguiente paso</Button>
                    </HStack>
                </Stack>
            }
        </>
    )
}

export default AddServices