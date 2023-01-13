import { useEffect, useState } from 'react'
import SearchLook from './SearchLook'
import { Container, Heading, Wrap, Stack, Text, Button, HStack, WrapItem } from '@chakra-ui/react'
import ServiceQuote from './ServiceQuote'

const AddServices = ({ services, selectedServices, setStep, step, setSelectedServices }) => {
    const [filter, setFilter] = useState({
        status: false,
        filteredServices: [],
        searchTerm: ''
    })
    useEffect(() => {
        const results = services.filter(service => {
            return (
                service.name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
                service.price.toString().includes(filter.searchTerm) ||
                service.type.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
                service.item.some(item => item.description.toLowerCase().includes(filter.searchTerm.toLowerCase()))
            )
        })
        setFilter({
            ...filter,
            filteredServices: results
        })
    }, [filter.searchTerm])

    const setSearch = (e) => {
        if (e.target.value.length > 0) {
            setFilter({
                ...filter,
                status: true,
                searchTerm: e.target.value
            })
        } else {
            setFilter({
                status: false,
                searchTerm: '',
                filteredServices: []
            })
        }
    }

    return (
        <>
            <Container maxW={"container.xl"} centerContent>
                <Heading mt={10} mb={5} fontSize={'6xl'}>Crear Cotización</Heading>
                <SearchLook searchTerm={filter.searchTerm} setSearch={setSearch} text={"Ver cotización"} setStep={setStep} step={step} filter={filter} setFilter={setFilter} />
                <Wrap spacing={10} justify={{ base: "center", md: "normal" }} pb={20}>
                    {filter.filteredServices.map(service => {
                        return (
                            <WrapItem key={service._id}>
                                <ServiceQuote id={service._id} title={service.name} price={service.price} description={service.description} type={service.type} items={service.item.length} setSelectedServices={setSelectedServices} selectedServices={selectedServices} />
                            </WrapItem>
                        )
                    })}
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