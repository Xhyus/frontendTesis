import React, { useState } from 'react';
import { Heading, Stack, FormControl, Input, FormLabel, InputGroup, Button, InputRightElement, Container, Link, Tooltip, Flex, Image } from '@chakra-ui/react';
import postLogin from '../data/postLogin';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';
import image from '../public/background.jpg'

const Home = () => {

	const [showInput, setShowInput] = useState(true);
	const handleClick = () => setShowInput(!showInput);
	const [user, setUser] = useState({
		email: '',
		password: '',
	})
	const Router = useRouter();

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			postLogin(user.email, user.password)
				.then((res) => {
					Cookies.set("token", res.data.token, { expires: 1 })
					Cookies.set("user", res.data.user, { expires: 1 })
					Router.push('/servicios')
				})
				.catch((err) => {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Usuario o contraseña incorrectos',
					})
				})
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Usuario o contraseña incorrectos',
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
					<FormControl id="password">
						<FormLabel>Contraseña</FormLabel>
						<Tooltip label="Ingresar contraseña" aria-label="A tooltip">
							<InputGroup size='md' onKeyDown={enterKeyHandler}>
								<Input pr='4.5rem' type={showInput ? 'password' : 'text'} color={"orange"} focusBorderColor={"yellow.600"} placeholder='Contraseña' onChange={handleChange} name="password" />
								<InputRightElement mr={"1"} width='4.5rem'>
									<Button h='1.75rem' size='sm' colorScheme={"orange"} onClick={handleClick}>{showInput ? 'Mostrar' : 'Ocultar'}</Button>
								</InputRightElement>
							</InputGroup>
						</Tooltip>
					</FormControl>
					<Button colorScheme="orange" size="md" w={'full'} onClick={handleSubmit}>Iniciar Sesión</Button>
					<Link onClick={() => Router.push("./newPassword")} color="orange.500" textAlign={"center"}>¿Olvidaste tu contraseña?</Link>
				</Stack>
			</Container>
		</Flex>
	)
}

export default Home