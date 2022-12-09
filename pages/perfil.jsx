import { useState } from 'react'
import { useRouter } from 'next/router'
import { HStack, Heading, Container, Stack, Button } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { changePassword } from '../data/user'
import jsCookie from 'js-cookie'
import PasswordInput from '../components/PasswordInput'
import { checkToken } from '../data/user'

export const getServerSideProps = async (context) => {
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

    const enterKeyHandler = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit(event);
        }
    };

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
                <PasswordInput id="password" label="Contraseña actual" name="password" placeholder="Contraseña actual" show={show} handleChange={handleChange} handleClick={handleClick} enterKeyHandler={enterKeyHandler} />
                <PasswordInput id="newPassword" label="Nueva contraseña" name="newPassword" placeholder="Nueva contraseña" show={show} handleChange={handleChange} handleClick={handleClick} enterKeyHandler={enterKeyHandler} />
                <PasswordInput id="rePassword" label="Repetir contraseña" name="rePassword" placeholder="Repetir contraseña" show={show} handleChange={handleChange} handleClick={handleClick} enterKeyHandler={enterKeyHandler} />
            </Stack>
            <HStack w={"full"} my={10}>
                <Button w="full" colorScheme={'green'} onClick={onSubmit}>Cambiar contraseña</Button>
                <Button w="full" colorScheme={"orange"} onClick={() => router.push('/')}>Atras</Button>
            </HStack>
        </Container>
    )
}

export default perfil