import { useState } from 'react'
import { useRouter } from 'next/router'
import { HStack, Heading, Container, Button } from '@chakra-ui/react'
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

const Perfil = () => {
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
        <Container maxW='container.md'>
            <Heading as={"h1"} my={10} fontSize={'6xl'} textAlign={"center"}>Perfil</Heading>
            <Heading as={"h2"} fontSize='3xl' mb={8}>Cambiar contraseña</Heading>
            <PasswordInput id="password" label="Contraseña actual" name="password" placeholder="Contraseña actual" show={show} handleChange={handleChange} handleClick={handleClick} enterKeyHandler={enterKeyHandler} />
            <PasswordInput id="newPassword" label="Nueva contraseña" name="newPassword" placeholder="Nueva contraseña" show={show} handleChange={handleChange} handleClick={handleClick} enterKeyHandler={enterKeyHandler} />
            <PasswordInput id="rePassword" label="Repetir contraseña" name="rePassword" placeholder="Repetir contraseña" show={show} handleChange={handleChange} handleClick={handleClick} enterKeyHandler={enterKeyHandler} />
            <HStack w={"full"} my={10}>
                <Button w="full" color={"white"} bgColor={"#7ABC63"} onClick={onSubmit}>Cambiar contraseña</Button>
                <Button w="full" colorScheme={"orange"} onClick={() => router.push('/')}>Atras</Button>
            </HStack>
        </Container>
    )
}

export default Perfil