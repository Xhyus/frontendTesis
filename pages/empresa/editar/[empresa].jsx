import { useState } from 'react'
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

const empresa = ({ data }) => {
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [company, setCompany] = useState(data)
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
            <EditCompany step={step} setStep={setStep} company={company} setCompany={setCompany} />
        </Container >
    )
}

export default empresa