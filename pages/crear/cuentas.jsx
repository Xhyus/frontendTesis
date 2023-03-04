import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Heading, Button, Container, HStack, Center, Spinner } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { createUser } from '../../data/user';
import InputAccount from '../../components/InputAccount';
import { checkToken } from '../../data/user'

const Cuentas = () => {
    const [account, setAccount] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const router = useRouter();
    const enterKeyHandler = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit(event);
        }
    };
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getData = async () => {
            try {
                let token = localStorage?.getItem('token')
                await checkToken(token)
                setLoading(false)
            } catch (error) {
                router.push('/')
            }
        }
        getData()
    }, [])


    const handleChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (account.password !== account.confirmPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden',
            })
        }
        try {
            let token = localStorage?.getItem('token')
            const response = await createUser(account.name, account.email, account.password, account.confirmPassword, token)
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cuenta creada',
                    text: 'Se ha creado la cuenta correctamente',
                }).then(() => {
                    router.push("/")
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, el correo no es válido, ya existe o las contraseñas no coinciden',
            })
        }
    }

    if (loading) {
        return (
            <Center h="95vh">
                <Spinner size="xl" />
            </Center>
        )
    }

    return (
        <Container maxW="container.md">
            <Heading as={"h1"} my={10} fontSize={'6xl'} textAlign={"center"}>Crear cuenta</Heading>
            <InputAccount name="name" label="Nombre" type="text" handlechange={handleChange} enterKeyHandler={enterKeyHandler} placeholder="Nombre" />
            <InputAccount name="email" label="Correo electrónico" type="email" handlechange={handleChange} enterKeyHandler={enterKeyHandler} placeholder="Correo electrónico" />
            <InputAccount name="password" label="Contraseña" type="password" handlechange={handleChange} enterKeyHandler={enterKeyHandler} placeholder="Contraseña" />
            <InputAccount name="confirmPassword" label="Confirmar contraseña" type="password" handlechange={handleChange} enterKeyHandler={enterKeyHandler} placeholder="Confirmar contraseña" />
            <HStack spacing={4} w="full" mx="auto" my={5}>
                <Button bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} w="full" onClick={onSubmit}>Crear cuenta</Button>
                <Button bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} w="full" onClick={() => router.push('/')}>Cancelar</Button>
            </HStack>
        </Container>
    )
}

export default Cuentas