import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Box, Link, HStack, ChakraProvider, Image, Drawer, DrawerOverlay, DrawerContent, DrawerFooter, DrawerCloseButton, useMediaQuery, Stack, useDisclosure, Button, DrawerHeader, DrawerBody, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { FaBars } from 'react-icons/fa';
import Cookies from 'js-cookie'
import axios from 'axios'

const Navbar = () => {
	const [isMobile] = useMediaQuery("(max-width: 600px)")
	const router = useRouter()
	const path = router.pathname.split('/')
	const [user, setUser] = useState('Usuario')

	useEffect(() => {
		if (Cookies.get('user')) {
			setUser(Cookies.get('user'))
		}
	}, [Cookies.get('user')])

	const currentPage = (boton) => {
		if (path[1] === 'servicios' && boton === 'servicios') {
			return "orange.300"
		}
		if (path[1] === 'cotizaciones' && boton === 'cotizaciones') {
			return "orange.300"
		}
		if (path[1] === 'empresas' && boton === 'empresas' || path[1] === 'empresa' && boton === 'empresas') {
			return "orange.300"
		}
		return "white"
	}

	const currentPageMobile = (boton) => {
		if (path[1] === 'servicios' && boton === 'servicios') {
			return "orange"
		}
		if (path[1] === 'cotizaciones' && boton === 'cotizaciones') {
			return "orange"
		}
		if (path[1] === 'empresas' && boton === 'empresas' || path[1] === 'empresa' && boton === 'empresas') {
			return "orange"
		}
		return "black"
	}

	const logout = async () => {
		await axios.get(`${process.env.SERVIDOR}/logout`)
		Cookies.remove('user')
		Cookies.remove('token');
		router.push('/')
	}

	const Desk = () => {
		return (
			<Box bgColor={"transparent"}>
				<HStack justify={"space-between"} my={5} mx={10}>
					<Image src="/logo.png" width={'32'} height={'8'} />
					<HStack spacing={8}>
						<Link _hover={{ color: "none" }} borderBottom={"2px"} borderColor={currentPage("servicios")} fontWeight={"bold"} onClick={() => router.push('/servicios')}>Servicios</Link>
						<Link _hover={{ color: "none" }} fontWeight={"bold"} borderBottom={"2px"} borderColor={currentPage("cotizaciones")} onClick={() => router.push('/cotizaciones')}>Cotizaciones</Link>
						<Link _hover={{ color: "none" }} fontWeight={"bold"} borderBottom={"2px"} borderColor={currentPage("empresas")} onClick={() => router.push('/empresas')}>Empresas</Link>
						<Menu>
							<MenuButton _hover={{ color: "none" }} fontWeight={"bold"} borderBottom={"2px"} borderColor={currentPage("perfil")}>{user}</MenuButton>
							<MenuList>
								<MenuItem>Perfil</MenuItem>
								<MenuItem>Crear cuenta</MenuItem>
								<MenuItem onClick={logout}>Cerrar sesion</MenuItem>
							</MenuList>
						</Menu>
					</HStack>
				</HStack>
			</Box >
		)
	}

	const DrawerMobile = () => {
		const { isOpen, onOpen, onClose } = useDisclosure()
		const btnRef = React.useRef()
		return (
			<>
				<Box m={5} borderBottom={'2px'} borderColor={"gray.300"} pb={2}>
					<FaBars size={30} ref={btnRef} onClick={onOpen} />
				</Box>
				<Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>
							<Image src="/logo.png" alt="logo" w={'64'} />
						</DrawerHeader>
						<DrawerBody justifyContent={"center"}>
							<Stack>
								<Link color={currentPageMobile("servicios")} fontWeight={"bold"} onClick={() => router.push('/servicios')}>Servicios</Link>
								<Link color={currentPageMobile("cotizaciones")} fontWeight={"bold"} borderBottom={currentPage} onClick={() => router.push('/cotizaciones')}>Cotizaciones</Link>
								<Link color={currentPageMobile("empresas")} fontWeight={"bold"} borderBottom={currentPage} onClick={() => router.push('/empresas')}>Empresas</Link>
							</Stack>
						</DrawerBody>
						<DrawerFooter justifyContent={"center"}>
							<Button colorScheme={"red"} fontWeight={"bold"} onClick={logout} >Cerrar Sesión</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer >
			</>
		)
	}

	return (
		<ChakraProvider>
			{isMobile ? <DrawerMobile /> : <Desk />}
		</ChakraProvider>
	)
}

export default Navbar