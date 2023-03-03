import { useEffect, useState } from 'react'
import { Heading, Button, Container, HStack, Spinner, Center } from '@chakra-ui/react';
import { signedPage } from '../../../data/signed'
import Constituted from '../../../components/Constituted';
import UnConstituted from '../../../components/UnConstituted';
import ContactForm from '../../../components/ContactForm';
import { useRouter } from 'next/router';

const Empresa = ({ empresa }) => {
    const [constitutedCompany, setConstitutedCompany] = useState(true)
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(true)
    const [company, setCompany] = useState({
        name: '',
        socialReason: '',
        email: '',
        phone: '',
        address: ''
    })
    const router = useRouter()
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        position: ''
    })
    const [companyRUT, setCompanyRUT] = useState('')
    const [contactRUT, setContactRUT] = useState('')

    useEffect(() => {
        localStorage.setItem('chakra-ui-color-mode', 'dark')
        const getSigned = async () => {
            try {
                await signedPage(empresa)
                setLoading(false)
            } catch (error) {
                router.push('/')
            }
        }
        getSigned()
    }, [])

    if (loading) {
        return (
            <Center h="95vh">
                <Spinner size="xl" />
            </Center>
        )
    }

    return (
        <Container maxW={"container.md"}>
            <Heading textAlign={'center'} as={"h1"} mt={10} fontSize={'6xl'}>Registro de Empresa</Heading>
            {step === 1 && (
                <>
                    <Heading as={"h2"} fontSize={"3xl"} my={5}>¿Cual es el estado de su empresa?</Heading>
                    <HStack align={"center"} justify={"center"} my={5}>
                        <Button w={'full'} bgColor={"#FF9F0F"} color="white" _hover={{ bgColor: "#F59300" }} onClick={() => setConstitutedCompany(true)} >Empresa constituida</Button>
                        <Button w={'full'} bgColor={"#53B6EE"} color="white" _hover={{ bgColor: "#33A7EB" }} onClick={() => setConstitutedCompany(false)} >Empresa no constituida</Button>
                    </HStack>
                    {constitutedCompany === true ?
                        <Constituted company={company} setCompany={setCompany} setStep={setStep} companyRUT={companyRUT} setCompanyRUT={setCompanyRUT} />
                        :
                        <UnConstituted company={company} setCompany={setCompany} setStep={setStep} companyRUT={companyRUT} setCompanyRUT={setCompanyRUT} />
                    }
                </>
            )}
            {
                step === 2 && (
                    <ContactForm company={company} setStep={setStep} setContact={setContact} contact={contact} state={constitutedCompany} companyRUT={companyRUT} contactRUT={contactRUT} setContactRUT={setContactRUT} />
                )
            }
        </Container >
    )
}

Empresa.getInitialProps = async (ctx) => {
    return { empresa: ctx.query.empresa }
}

export default Empresa