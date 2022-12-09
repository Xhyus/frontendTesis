import { useState } from 'react'
import { useRouter } from 'next/router'
import { Heading, Stack, FormControl, Input, FormLabel, InputGroup, Button, InputRightElement, Container, Link, Tooltip, Flex, HStack } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { createUser } from '../../data/user';
import InputAccount from '../../components/InputAccount';

const cuentas = () => {
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
    const handleChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(account)
        if (account.password !== account.confirmPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden',
            })
        }
        try {
            const response = await createUser(account.name, account.email, account.password, account.confirmPassword)
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
                text: 'Ha ocurrido un error, el correo no existe, no esta asociado a una cuenta o no se ha podido enviar el correo',
            })
        }
    }

    return (
        <Container maxW="container.md">
            <Heading as={"h1"} my={10} textAlign="center">Crear cuenta</Heading>
            <Stack spacing={4} w="full" mx="auto">
                <InputAccount name="name" label="Nombre" type="text" handlechange={handleChange} enterKeyHandler={enterKeyHandler} placeholder="Nombre" />
                <InputAccount name="email" label="Correo electronico" type="email" handlechange={handleChange} enterKeyHandler={enterKeyHandler} placeholder="Correo electronico" />
                <InputAccount name="password" label="Contraseña" type="password" handlechange={handleChange} enterKeyHandler={enterKeyHandler} placeholder="Contraseña" />
                <InputAccount name="confirmPassword" label="Confirmar contraseña" type="password" handlechange={handleChange} enterKeyHandler={enterKeyHandler} placeholder="Confirmar contraseña" />
            </Stack>
            <HStack spacing={4} w="full" mx="auto" my={4}>
                <Button colorScheme="blue" w="full" onClick={onSubmit}>Crear cuenta</Button>
                <Button colorScheme="red" w="full" onClick={() => router.push('/')}>Cancelar</Button>
            </HStack>
        </Container>
    )
}

export default cuentas