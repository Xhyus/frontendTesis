import { useEffect, useState } from 'react';
import { Heading, Stack, FormControl, Input, FormLabel, Button, Container, Link, Tooltip, Flex } from '@chakra-ui/react';
import Cookies from 'js-cookie'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';
import { checkToken, postLogin } from '../data/user';
import PasswordInput from '../components/PasswordInput';

export const getServerSideProps = async (context) => {
	try {
		await checkToken(context.req.headers.cookie)
		return {
			redirect: {
				destination: '/servicios',
				permanent: false
			}
		}
	} catch (error) {
		return {
			props: { data: null }
		}
	}
}

const Home = () => {
	const [showInput, setShowInput] = useState(false);
	const handleClick = () => setShowInput(!showInput);
	const [user, setUser] = useState({
		email: '',
		password: '',
	})
	const [cookies, setCookie] = useCookies(['token', 'user']);

	const Router = useRouter();
	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	useEffect(() => {
		localStorage.setItem('chakra-ui-color-mode', 'dark')
	}, [])


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await postLogin(user.email, user.password)
			console.log(response)
			setCookie('user', response.data.user)
			setCookie('token', response.data.token)
			// Cookies.set("token", response.data.token, { expires: 1 })
			// Cookies.set("user", response.data.user, { expires: 1 })
			Router.push('/servicios')
		} catch (error) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Algo salió mal, por favor intente nuevamente',
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
					<Heading as="h1" size="xl" textAlign={"center"} textShadow={'2px 2px black'}>Plataforma de Cotizaciones Estudio Fragua</Heading>
					<Heading as="h2" size="md" textAlign={"center"} textShadow={'2px 2px black'}>Para utilizar la plataforma, por favor inicie sesión</Heading>
					<FormControl id="email">
						<FormLabel>Correo Electrónico</FormLabel>
						<Tooltip label="Ingresar Correo Electrónico" aria-label="Correo Electrónico">
							<Input placeholder="Ej: correo@mail.com" color={"orange"} focusBorderColor={"yellow.600"} type="email" onChange={handleChange} name="email" />
						</Tooltip>
					</FormControl>
					<PasswordInput id="password" label="Contraseña" name="password" placeholder="Contraseña" show={showInput} handleChange={handleChange} handleClick={handleClick} enterKeyHandler={enterKeyHandler} />
					<Button bgColor={"#FF9F0F"} color="white" _hover={{ bgColor: "#F59300" }} size="md" w={'full'} onClick={handleSubmit}>Iniciar Sesión</Button>
					<Link onClick={() => Router.push("./recuperar")} color="orange.500" textAlign={"center"}>¿Olvidaste tu contraseña?</Link>
				</Stack>
			</Container>
		</Flex>
	)
}

export default Home