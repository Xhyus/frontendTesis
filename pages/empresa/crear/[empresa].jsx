import { useEffect, useState } from 'react'
import { Heading, Button, Container, HStack } from '@chakra-ui/react';
import { signedPage } from '../../../data/signed'
import Constituted from '../../../components/Constituted';
import UnConstituted from '../../../components/UnConstituted';
import ContactForm from '../../../components/ContactForm';

export const getServerSideProps = async (context) => {
    try {
        const res = await signedPage(context.query)
        if (res.status === 200 && res.data.use === 'company') {
            return {
                props: {
                    data: res.data
                }
            }
        } else {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
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

const Empresa = () => {
    const [constitutedCompany, setConstitutedCompany] = useState(true)
    const [step, setStep] = useState(1)
    const [company, setCompany] = useState({
        name: '',
        socialReason: '',
        email: '',
        phone: '',
        address: ''
    })
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
    }, [])

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
            )
            }
            {
                step === 2 && (
                    <ContactForm company={company} setStep={setStep} setContact={setContact} contact={contact} state={constitutedCompany} companyRUT={companyRUT} contactRUT={contactRUT} setContactRUT={setContactRUT} />
                )
            }
        </Container >
    )
}

export default Empresa