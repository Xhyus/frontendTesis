import React from 'react'
import { Heading, Stack, FormControl, Input, FormLabel, InputGroup, Button, InputRightElement, Container, Link, Tooltip, Flex } from '@chakra-ui/react';
import { checkToken } from '../data/user';

export async function getServerSideProps(context) {
    try {
        const res = await checkToken(context.req.headers.cookie)
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

const cotizaciones = ({ data }) => {
    return (
        <Flex w={'full'} h={"100vh"} justify={"center"} align="center">
            <Container maxW="container.md" justifyContent={"center"} alignItems={"center"} >
                <Stack spacing={4} justify={"center"}>
                    <Heading as="h1" size="xl" textAlign={"center"}>Plataforma de Cotizaciones Estudio Fragua</Heading>
                </Stack>
                {/* react table */}

            </Container>
        </Flex>
    )
}

export default cotizaciones