import { useState } from 'react'
import { getServices } from '../../data/services';
import { getCompanies } from '../../data/company';
import AddServices from '../../components/AddServices';
import ServiceQuote from '../../components/ServiceQuote';
import QuoteForm from '../../components/QuoteForm';
import QuotePreview from '../../components/QuotePreview';

export async function getServerSideProps(context) {
    try {
        const loggedIn = context.req.headers.cookie.split(';').find(c => c.trim().startsWith('loggedIn=')).split('=')[1]
        if (loggedIn === 'true') {
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
        projectDelivery: '',
        company: '',
        payment: '',
        formalization: '',
        document: '',
    })
    const [selectedInfo, setSelectedInfo] = useState({
        company: null,
        payment: null,
        formalization: null,
        document: null
    })
    const [step, setStep] = useState(1)

    if (step === 1) {
        return (
            <AddServices services={services} selectedServices={selectedServices} setStep={setStep} step={step} setSelectedServices={setSelectedServices} />
        )
    }
    if (step === 2) {
        return (
            <QuoteForm quote={quote} setQuote={setQuote} setStep={setStep} companies={companiesList} selectedInfo={selectedInfo} setSelectedInfo={setSelectedInfo} />
        )
    }
    if (step === 3) {
        return (
            <QuotePreview quote={quote} selectedServices={selectedServices} setStep={setStep} />
        )
    }
}

export default CrearCotizaciones