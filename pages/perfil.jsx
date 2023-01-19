import { useState } from 'react'
import { useRouter } from 'next/router'
import { HStack, Heading, Container, Button } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { changePassword } from '../data/user'
import PasswordInput from '../components/PasswordInput'
import { checkToken } from '../data/user'
import Cookies from 'js-cookie'

export const getServerSideProps = async (context) => {
    try {
        const loggedIn = context.req.headers.cookie.split(';').find(c => c.trim().startsWith('loggedIn=')).split('=')[1]
        if (loggedIn === 'true') {
            return {
                props: {
                    data: null
                }
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
            const response = await changePassword(password, token, Cookies.get("user_id"))
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
                <Button w="full" bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} onClick={onSubmit}>Cambiar contraseña</Button>
                <Button w="full" bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} onClick={() => router.push('/')}>Cancelar</Button>
            </HStack>
        </Container>
    )
}

export default Perfil