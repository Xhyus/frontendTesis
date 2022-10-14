import React, { useState } from 'react';
import { Heading, Stack, FormControl, Input, FormLabel, InputGroup, Button, InputRightElement, Container, Link, Tooltip, Flex } from '@chakra-ui/react';
import postLogin from '../data/postLogin';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

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
		console.log(user);
		try {
			postLogin(user.email, user.password)
				.then((res) => {
					Cookies.set("token", res.data.token, { expires: 1 })
					Cookies.set("user", res.data.user, { expires: 1 })
				})
				.catch((err) => {
					console.log(err);
				})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Flex w={'full'} h={"100vh"} justify={"center"} align="center">
			<Container maxW="container.md" justifyContent={"center"} alignItems={"center"} >
				<Stack spacing={4} justify={"center"}>
					<Heading as="h1" size="xl" textAlign={"center"}>Plataforma de Cotizaciones Estudio Fragua</Heading>
					<Heading as="h2" size="md" textAlign={"center"}>Para utilizar la plataforma, por favor inicie sesión</Heading>
					<FormControl id="email">
						<FormLabel>Correo Electrónico</FormLabel>
						<Tooltip label="Ingresar Correo Electrónico" aria-label="Correo Electrónico">
							<Input placeholder="Ej: correo@mail.com" type="email" onChange={handleChange} name="email" />
						</Tooltip>
					</FormControl>
					<FormControl id="password">
						<FormLabel>Contraseña</FormLabel>
						<Tooltip label="Ingresar contraseña" aria-label="A tooltip">
							<InputGroup size='md'>
								<Input pr='4.5rem' type={showInput ? 'password' : 'text'} placeholder='Contraseña' onChange={handleChange} name="password" />
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