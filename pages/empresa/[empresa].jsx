import { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Center, Spinner } from '@chakra-ui/react';
import Company from '../../components/Company';
import { useRouter } from 'next/router'
import { signedPage } from '../../data/signed'

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
                    destination: '/login',
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

const empresa = () => {
    const [loading, setLoading] = useState(false)
    const [constitutedCompany, setConstitutedCompany] = useState(true)
    const [step, setStep] = useState(1)

    if (loading) {
        return (
            <Center h="92.5vh">
                <Spinner size="xl" />
            </Center>
        )
    }

    return (
        <Container maxW={"container.md"}>
            <HStack align={"center"} justify={"center"} mt={10}>
                <Heading>Registro de Empresa</Heading>
            </HStack>
            {step === 1 && (
                <>
                    <Text my={5}>¿Cual es el estado de su empresa?</Text>
                    <HStack align={"center"} justify={"center"} my={5}>
                        <Button w={'full'} onClick={() => setConstitutedCompany(true)} colorScheme={'orange'}>Empresa constituida</Button>
                        <Button w={'full'} onClick={() => setConstitutedCompany(false)} colorScheme={'cyan'}>Empresa no constituida</Button>
                    </HStack>
                </>
            )}
            <Company state={constitutedCompany} step={step} setStep={setStep} />
        </Container >
    )
}

export default empresa