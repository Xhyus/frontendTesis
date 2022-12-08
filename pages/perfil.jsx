import { useState } from 'react'
import { useRouter } from 'next/router'
import { HStack, Text, Heading, Input, Container, Stack, Button, FormControl, FormLabel, InputGroup, InputRightElement } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { changePassword } from '../data/user'
import jsCookie from 'js-cookie'

const perfil = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const router = useRouter()
    const [token] = useState(jsCookie.get('token'))
    const [password, setPassword] = useState({
        password: '',
        newPassword: '',
        rePassword: ''
    })

    const handleChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password.newPassword !== password.rePassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden',
            })
        }
        try {
            const response = await changePassword(password, token)
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña cambiada',
                    text: 'La contraseña se ha cambiado correctamente',
                }).then(() => {
                    router.push('/')
                })
            }
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, revisa los datos ingresados',
            })
        }
    }

    return (
        <Container maxW='container.xl'>
            <Heading my={10} textAlign={"center"}>Perfil</Heading>
            <Heading size='md' my={10}>Cambiar contraseña</Heading>
            <Stack>
                <FormControl id="password">
                    <FormLabel>Contraseña actual</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Contraseña actual'
                            name='password'
                            onChange={handleChange}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl id="newPassword">
                    <FormLabel>Nueva contraseña</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            name='newPassword'
                            type={show ? 'text' : 'password'}
                            placeholder='Contraseña nueva'
                            onChange={handleChange}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl id="rePassword">
                    <FormLabel>Repetir nueva contraseña</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Repetir contraseña nueva'
                            onChange={handleChange}
                            name='rePassword'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </Stack>
            <HStack w={"full"} my={10}>
                <Button w="full" colorScheme={'green'} onClick={onSubmit}>Cambiar contraseña</Button>
                <Button w="full" colorScheme={"orange"} onClick={() => router.push('/')}>Atras</Button>
            </HStack>
        </Container>
    )
}

export default perfil