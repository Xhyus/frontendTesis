import { useState, useEffect } from 'react'
import { Heading, Container, Center, Spinner } from '@chakra-ui/react';
import { getCompany } from '../../../data/company'
import CompanyFormEdit from '../../../components/CompanyFormEdit';
import ContactFormEdit from '../../../components/ContactFormEdit';
import { useRouter } from 'next/router';

const Empresa = ({ empresa }) => {
    const [step, setStep] = useState(1)
    const [data, setData] = useState()
    const [company, setCompany] = useState()
    const [constituted, setConstituted] = useState(data?.socialReason !== null ? true : false)
    const [companyRUT, setCompanyRUT] = useState(data?.rut)
    const [contactRUT, setContactRUT] = useState(data?.contact.rut)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getCompany(empresa)
                setData(res.data)
                setLoading(false)
            } catch (error) {
                router.push('/')
            }
        }
        getData()
    }, [])
    if (loading) {
        return (
            <Center v="95vh">
                <Spinner size="xl" />
            </Center>
        )
    }

    return (
        <Container maxW={"container.md"}>
            <Heading as={"h1"} fontSize="6xl" my={10}>Editar Empresa</Heading>
            {step === 1 ?
                <CompanyFormEdit company={data} setCompany={setCompany} setStep={setStep} companyRUT={companyRUT} setCompanyRUT={setCompanyRUT} constituted={constituted} setConstituted={setConstituted} />
                :
                <ContactFormEdit company={company} setStep={setStep} contact={data.contact} setContact={setCompany} contactRUT={contactRUT} setContactRUT={setContactRUT} state={constituted} companyRUT={companyRUT} id={data._id} />
            }
        </Container >
    )
}

Empresa.getInitialProps = async (ctx) => {
    return { empresa: ctx.query.empresa }
}

export default Empresa