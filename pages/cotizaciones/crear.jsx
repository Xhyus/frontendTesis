import { useState, useEffect } from 'react'
import { Heading, Container, WrapItem, Text, Button } from '@chakra-ui/react';
import { getServices } from '../../data/services';
import { getCompanies } from '../../data/company';
import AddServices from '../../components/AddServices';
import ServiceQuote from '../../components/ServiceQuote';
import QuoteForm from '../../components/QuoteForm';

export async function getServerSideProps(context) {
    try {
        let services = await getServices(context.req.headers.cookie)
        let companies = await getCompanies(context.req.headers.cookie)
        return {
            props: {
                data: {
                    services: services.data,
                    company: companies.data
                },
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
    const [companiesList] = useState(data.company)
    const [services] = useState(data.services)
    const [selectedServices, setSelectedServices] = useState([])
    const [quote, setQuote] = useState({
        name: '',
        description: '',
        paymentMethod: '',
    })
    const [selectedInfo, setSelectedInfo] = useState({
        company: '',
        payment: '',
        formalization: '',
        documents: ''
    })
    const [step, setStep] = useState(1)

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

    if (step === 2) {
        return (
            <AddServices services={services} selectedServices={selectedServices} cardList={cardList} setStep={setStep} step={step} />
        )
    }
    if (step === 1) {
        return (
            <QuoteForm quote={quote} setQuote={setQuote} setStep={setStep} companies={companiesList} selectedInfo={selectedInfo} setSelectedInfo={setSelectedInfo} />
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