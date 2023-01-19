import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router'
import { Box, Link, HStack, ChakraProvider, Image, Drawer, DrawerOverlay, DrawerContent, DrawerFooter, DrawerCloseButton, useMediaQuery, Stack, useDisclosure, Button, DrawerHeader, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react"
import { FaBars, FaAngleDown } from 'react-icons/fa';
import Cookies from 'js-cookie'
// import Axios from 'axios'

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
		if (path[1] === 'perfil' && boton === 'perfil' || path[1] === 'perfil' && boton === 'user') {
			return "orange.300"
		}
		if (path[1] === 'crear' && path[2] === 'cuentas' && (boton === 'perfil/cuentas' || boton === 'user')) {
			return "orange.300"
		}
		return null
	}

	const logout = () => {
		try {
			Cookies.remove("loggedIn");
			Cookies.remove("user");
			Cookies.remove("user_id");
			router.push('/')
		} catch (error) {
			Cookies.remove("loggedIn");
			Cookies.remove("user");
			Cookies.remove("user_id");
			router.push('/')
		}
	}

	const Desk = () => {
		return (
			<Box bgColor={"transparent"}>
				<HStack justify={"space-between"} py={5} px={10}>
					<Image src="/logo.png" width={'32'} height={'8'} />
					<HStack spacing={8}>
						<Link _hover={{ color: "none" }} borderBottom={"2px"} borderColor={currentPage("servicios")} fontWeight={"bold"} onClick={() => router.push('/servicios')}>Servicios</Link>
						<Link _hover={{ color: "none" }} fontWeight={"bold"} borderBottom={"2px"} borderColor={currentPage("cotizaciones")} onClick={() => router.push('/cotizaciones')}>Cotizaciones</Link>
						<Link _hover={{ color: "none" }} fontWeight={"bold"} borderBottom={"2px"} borderColor={currentPage("empresas")} onClick={() => router.push('/empresas')}>Empresas</Link>
						<Menu>
							<MenuButton _hover={{ color: "none" }} fontWeight={"bold"} borderBottom={"2px"} borderColor={currentPage("user")} w={"fit-content"}>
								<HStack >
									<Text>{user}</Text>
									<FaAngleDown />
								</HStack>
							</MenuButton>
							<MenuList>
								<MenuItem color={currentPage("perfil")} onClick={() => router.push('/perfil')}>Perfil</MenuItem>
								<MenuItem color={currentPage("perfil/cuentas")} onClick={() => router.push('/crear/cuentas')}>Crear cuenta</MenuItem>
								<MenuItem onClick={logout} color={"red"}>Cerrar sesion</MenuItem>
							</MenuList>
						</Menu>
					</HStack>
				</HStack>
			</Box >
		)
	}

	const DrawerMobile = () => {
		const { isOpen, onOpen, onClose } = useDisclosure()
		const btnRef = useRef()
		return (
			<>
				<HStack px={5} pt={5} pb={7} align="center" justify={"space-between"}>
					<FaBars size={30} ref={btnRef} onClick={onOpen} />
					<Image src="/logo.png" alt="logo" w={'40%'} />
				</HStack>
				<Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>
							<Image src="/logo.png" alt="logo" w={'64'} />
						</DrawerHeader>
						<DrawerBody justifyContent={"center"}>
							<Stack>
								<Link color={currentPage("servicios")} fontWeight={"bold"} onClick={() => router.push('/servicios')}>Servicios</Link>
								<Link color={currentPage("cotizaciones")} fontWeight={"bold"} borderBottom={currentPage} onClick={() => router.push('/cotizaciones')}>Cotizaciones</Link>
								<Link color={currentPage("empresas")} fontWeight={"bold"} borderBottom={currentPage} onClick={() => router.push('/empresas')}>Empresas</Link>
								<Link color={currentPage("perfil")} fontWeight={"bold"} borderBottom={currentPage} onClick={() => router.push('/perfil')}>Perfil</Link>
								<Link color={currentPage("perfil/cuentas")} fontWeight={"bold"} borderBottom={currentPage} onClick={() => router.push('/crear/cuentas')}>Crear cuenta</Link>
							</Stack>
						</DrawerBody>
						<DrawerFooter justifyContent={"center"}>
							<Button bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} fontWeight={"bold"} onClick={logout} >Cerrar Sesión</Button>
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