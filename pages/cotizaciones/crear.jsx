import { useState, useEffect } from 'react'
import { getServices } from '../../data/services';
import { getCompanies } from '../../data/company';
import AddServices from '../../components/AddServices';
import QuoteForm from '../../components/QuoteForm';
import QuotePreview from '../../components/QuotePreview';
import { useRouter } from 'next/router'
import { Center, Spinner } from '@chakra-ui/react'

const CrearCotizaciones = () => {
    const [companiesList, setCompanyList] = useState([])
    const [services, setServices] = useState([])
    const [selectedServices, setSelectedServices] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
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
    useEffect(() => {
        const getData = async () => {
            try {
                let token = localStorage?.getItem('token')
                let response = await getCompanies(token)
                setCompanyList(response.data)
                response = await getServices(token)
                setServices(response.data)
                setLoading(false)
            } catch (error) {
                router.push('/')
            }
        }
        getData()
    }, [])
    const [selectedInfo, setSelectedInfo] = useState({
        company: null,
        payment: null,
        formalization: null,
        document: null
    })
    const [step, setStep] = useState(1)
    if (loading) {
        return (
            <Center h="95vh">
                <Spinner size="xl" />
            </Center>
        )
    }
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