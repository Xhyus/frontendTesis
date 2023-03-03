import { useState, useEffect } from 'react'
import { Heading, Stack, FormControl, Input, FormLabel, Button, Container, Link, Tooltip, Flex, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { recoverPassword, checkToken } from '../data/user';
import Swal from 'sweetalert2';

const Recuperar = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: ''
    })
    const [loading, setLoading] = useState(true)
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage?.getItem('token')
                await checkToken(token)
                router.push('/servicios')
            } catch (error) {
                setLoading(false)
                return
            }
        }
        fetchData()
    }, [])
    if (loading) {
        return (
            <Center h="95vh">
                <Spinner size="xl" />
            </Center>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await recoverPassword(user.email)
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Recuperación de contraseña',
                    text: 'Se ha enviado un correo a su cuenta de correo electronico',
                }).then(() => {
                    router.push("/")
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, el correo no existe, no está asociado a una cuenta o no se ha podido enviar el correo',
            })
        }
    }

    const enterKeyHandler = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <Flex w={'full'} h={"100vh"} justify={"center"} align="center" backgroundImage="url('/background.jpg')" bgPos={"bottom"} filter='auto' >
            <Container maxW="container.md" justifyContent={"center"} alignItems={"center"} backdropFilter='auto' backdropContrast='85%' p={'14'} >
                <Stack spacing={4} justify={"center"} >
                    <Heading as="h1" size="xl" textAlign={"center"} textShadow={'2px 2px black'}>Recuperar Contraseña</Heading>
                    <Heading as="h2" size="md" textAlign={"center"} textShadow={'2px 2px black'}>Para solicitar una nueva contraseña escriba su correo electrónico asociado a una cuenta de la plataforma</Heading>
                    <FormControl id="email">
                        <FormLabel>Correo Electrónico</FormLabel>
                        <Tooltip label="Ingresar Correo Electrónico" aria-label="Correo Electrónico">
                            <Input onKeyDown={enterKeyHandler} placeholder="Ej: correo@mail.com" color={"orange"} focusBorderColor={"yellow.600"} type="email" onChange={handleChange} name="email" />
                        </Tooltip>
                    </FormControl>
                    <Button bgColor={"#FF9F0F"} color="white" _hover={{ bgColor: "#F59300" }} size="md" w={'full'} onClick={handleSubmit}>Recuperar contraseña</Button>
                    <Link onClick={() => router.push("/")} color="orange.500" textAlign={"center"}>Volver al inicio</Link>
                </Stack>
            </Container>
        </Flex>)
}

export default Recuperar