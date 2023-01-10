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

const CrearCotizaciones = ({ data }) => {
    const [companiesList] = useState(data.company)
    const [services] = useState(data.services)
    const [selectedServices, setSelectedServices] = useState([])
    const [quote, setQuote] = useState({
        name: '',
        description: '',
        paymentMethod: '',
        company: '',
        payment: '',
        formalization: '',
        document: '',
        projectDelivery: '',
    })
    const [selectedInfo, setSelectedInfo] = useState({
        company: null,
        payment: null,
        formalization: null,
        document: null
    })
    const [step, setStep] = useState(1)

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
            <AddServices services={services} selectedServices={selectedServices} cardList={cardList} setStep={setStep} step={step} />
        )
    }
    if (step === 2) {
        return (
            <QuoteForm quote={quote} setQuote={setQuote} setStep={setStep} companies={companiesList} selectedInfo={selectedInfo} setSelectedInfo={setSelectedInfo} />
        )
    }
    if (step === 3) {
        return (
            <Container maxW={"container.xl"} centerContent>
                <Heading mt={10} mb={5} fontSize={'6xl'}>Crear Cotización</Heading>
                <Text>Nombre de la cotización:{quote.name}</Text>
                <Text>Descripción de la cotización: {quote.description}</Text>
                <Text>Empresa cotizante: {quote.company}</Text>
                <Text>Medio de pago: {quote.payment}</Text>
                <Text>Formalización: {quote.formalization}</Text>
                <Text>Tipo de factura: {quote.document}</Text>
                <Text>Metodo de pago: {quote.paymentMethod}</Text>
                <Text>Plazo de entrega: {quote.projectDelivery}</Text>
                {selectedServices.map(service => {
                    console.log(service)
                    return (
                        <Text>Servicio: {service}</Text>
                    )
                })}
                <Button color={"white"} bgColor={"#7ABC63"} borderRadius={'3xl'} onClick={() => setStep(1)}>Atras</Button>
            </Container >
        )
    }
}

export default CrearCotizaciones