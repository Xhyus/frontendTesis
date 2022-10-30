import { useState } from 'react'
import { Heading, Button, Container, HStack, Text, Center, Spinner } from '@chakra-ui/react';
import Constituted from '../../components/Constituted';
import { useRouter } from 'next/router'
import signedPage from '../../data/getSignedPage';

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
            <Text my={5}>¿Cual es el estado de su empresa?</Text>
            <HStack align={"center"} justify={"center"} my={5}>
                <Button w={'full'} onClick={() => setConstitutedCompany(true)} colorScheme={'orange'}>Empresa constituida</Button>
                <Button w={'full'} onClick={() => setConstitutedCompany(false)} colorScheme={'cyan'}>Empresa no constituida</Button>
            </HStack>
            <Constituted state={constitutedCompany} />
        </Container >
    )
}

export default empresa