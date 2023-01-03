import { useEffect, useState } from 'react'
import { Heading, Container, HStack, Center, Spinner } from '@chakra-ui/react';
import { getCompany } from '../../../data/company'
import EditCompany from '../../../components/EditCompany';

export async function getServerSideProps(context) {
    try {
        const res = await getCompany(context.query.empresa, context.req.headers.cookie)
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

const Empresa = ({ data }) => {
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [company, setCompany] = useState(data)
    const [constituted, setConstituted] = useState(false)

    const setDefault = () => {
        if (company.address.length > 0 && company.socialReason.length > 0) {
            setConstituted(true)
        }
    }

    useEffect(() => {
        setDefault()
    }, [data])

    if (loading) {
        return (
            <Center h="92.5vh">
                <Spinner size="xl" />
            </Center>
        )
    }
    return (
        <Container maxW={"container.md"}>
            <HStack align={"center"} justify={"center"} my={10}>
                <Heading>Editar Empresa: {company.name}</Heading>
            </HStack>
            <EditCompany step={step} setStep={setStep} company={company} setCompany={setCompany} constituted={constituted} setConstituted={setConstituted} />
        </Container >
    )
}

export default Empresa