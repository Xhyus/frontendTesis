import { useState, useEffect } from 'react'
import { Heading, Wrap, Container, WrapItem, FormControl, Stack, FormLabel, Select, Input, Text, HStack, Button } from '@chakra-ui/react';
import { getServices } from '../../data/services';
import { useRouter } from 'next/router';
import AddServices from '../../components/AddServices';
import ServiceQuote from '../../components/ServiceQuote';

export async function getServerSideProps(context) {
    try {
        const res = await getServices(context.req.headers.cookie)
        return {
            props: {
                data: res.data
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}

const crearCotizaciones = ({ data }) => {
    const [services] = useState(data)
    const [filteredServices, setFilteredServices] = useState([])
    const [filter, setFilter] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedServices, setSelectedServices] = useState([])
    const [quote, setQuote] = useState({
        name: '',
        description: '',
        quoteServices: services.filter(service => selectedServices.includes(service._id)),
        formalization: '',
        payment: '',
        paymentMethod: '',
        documents: '',
        company: ''
    })

    const [step, setStep] = useState(1)

    useEffect(() => {
        const results = services.filter(service => {
            return (
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.price.toString().includes(searchTerm) ||
                service.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.item.some(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        })
        setFilteredServices(results)
    }, [searchTerm])

    const setSearch = (e) => {
        if (e.target.value.length > 0) {
            setSearchTerm(e.target.value)
            setFilter(true)
        } else {
            setSearchTerm('')
            setFilter(false)
        }
    }

    useEffect(() => {
        console.log(selectedServices)
    }, [selectedServices])

    const cardList = (data) => {
        return data.map(service => {
            return (
                <WrapItem key={service._id}>
                    <ServiceQuote id={service._id} title={service.name} price={service.price} description={service.description} type={service.type} items={service.item.length} setSelectedServices={setSelectedServices} selectedServices={selectedServices} />
                </WrapItem>
            )
        })
    }

    if (step === 1) {
        return (
            <AddServices services={services} selectedServices={selectedServices} cardList={cardList} setSearchTerm={setSearchTerm} searchTerm={searchTerm} setSearch={setSearch} setStep={setStep} step={step} filter={filter} filteredServices={filteredServices} />
        )
    }
    if (step === 2) {
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
    if (step === 3) {
        return (
            <Container maxW={"container.xl"} centerContent>
                <Heading mt={10} mb={5} fontSize={'6xl'}>Crear Cotización</Heading>
                <Text>Nombre de la cotizacion:{quote.name}</Text>
                <Button color={"white"} bgColor={"#7ABC63"} borderRadius={'3xl'} onClick={() => setStep(1)}>Atras</Button>
            </Container >
        )
    }
}

export default crearCotizaciones