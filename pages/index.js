import React, { useState, useEffect } from 'react';
import { Heading, Text, Stack, HStack, VStack, FormControl, TagLabel, Input, FormLabel, InputGroup, Button, InputRightElement, Container, Link, Tooltip } from '@chakra-ui/react';

const Home = () => {

	const [showInput, setShowInput] = useState(true);
	const handleClick = () => setShowInput(!showInput);

	return (
		<Container maxW="container.md" h={"full"} w={'full'} >
			<Stack spacing={4} align={"center"} justify={"center"}>
				<Heading as="h1" size="xl" textAlign={"center"}>Bienvenido a Plataforma de Cotizaciones Estudio Fragua</Heading>
				<Heading as="h2" size="md" textAlign={"center"}>Para utilizar la plataforma, por favor inicie sesión</Heading>
				<FormControl id="email">
					<FormLabel>Correo Electrónico</FormLabel>
					<Tooltip color={"white"} fontWeight={"bold"} bgColor={"orange"} label="Ingresar Correo Electrónico" aria-label="Correo Electrónico">
						<Input placeholder="Ej: correo@mail.com" />
					</Tooltip>
				</FormControl>
				<Tooltip label="Ingresar contraseña" aria-label="A tooltip">
					<InputGroup size='md'>
						<Input pr='4.5rem' type={showInput ? 'password' : 'text'} placeholder='Contraseña' />
						<InputRightElement mr={"1"} width='4.5rem'>
							<Button h='1.75rem' size='sm' onClick={handleClick}>{showInput ? 'Mostrar' : 'Ocultar'}</Button>
						</InputRightElement>
					</InputGroup>
				</Tooltip>
				<Button colorScheme="teal" size="md" w={'full'}>Iniciar Sesión</Button>
				<Link href="./newPassword" color="teal.500" textAlign={"center"}>¿Olvidaste tu contraseña?</Link>
			</Stack>
		</Container >
	)
}

export default Home