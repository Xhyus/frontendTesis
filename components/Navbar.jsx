import React from 'react';
import { useRouter } from 'next/router'
import { Box, Link, HStack, ChakraProvider, Image, Drawer, DrawerOverlay, DrawerContent, DrawerFooter, DrawerCloseButton, useMediaQuery, Stack, useDisclosure, Button, DrawerHeader, DrawerBody } from "@chakra-ui/react"
import { FaBars } from 'react-icons/fa';
const Navbar = () => {

	const [isMobile] = useMediaQuery("(max-width: 600px)")
	const router = useRouter()
	const path = router.pathname.split('/')
	const currentPage = (boton) => {
		if (path[1] === 'servicios' && boton === 'servicios') {
			return "orange.300"
		} else {
			if (path[1] === 'cotizaciones' && boton === 'cotizaciones') {
				return "orange.300"
			} else {
				return "white"
			}
		}
	}

	const currentPageMobile = (boton) => {
		if (path[1] === 'servicios' && boton === 'servicios') {
			return "orange"
		} else {
			if (path[1] === 'cotizaciones' && boton === 'cotizaciones') {
				return "orange"
			} else {
				return "black"
			}
		}
	}

	const desk = () => {
		return (
			<Box bgColor={"transparent"}>
				<HStack justify={"space-between"} my={5} mx={10}>
					<Image src="/logo.png" width={'32'} height={'8'} />
					<HStack spacing={8}>
						<Link _hover={{ color: "none" }} color={"white"} borderBottom={"2px"} borderColor={currentPage("servicios")} fontWeight={"bold"} onClick={() => router.push('servicios')} >Servicios</Link>
						<Link _hover={{ color: "none" }} color={"white"} fontWeight={"bold"} borderBottom={"2px"} borderColor={currentPage("cotizaciones")} onClick={() => router.push('cotizaciones')} >Cotizaciones</Link>
						<Link _hover={{ color: "none" }} color={"white"} fontWeight={"bold"} onClick={() => router.push('/')} >Cerrar Sesión</Link>
					</HStack>
				</HStack>
			</Box>
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
								<Link color={currentPageMobile("servicios")} fontWeight={"bold"} onClick={() => router.push('servicios')} >Servicios</Link>
								<Link color={currentPageMobile("cotizaciones")} fontWeight={"bold"} borderBottom={currentPage} onClick={() => router.push('cotizaciones')} >Cotizaciones</Link>
							</Stack>
						</DrawerBody>
						<DrawerFooter justifyContent={"center"}>
							<Button colorScheme={"red"} fontWeight={"bold"} onClick={() => router.push('/')} >Cerrar Sesión</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer >
			</>
		)
	}

	return (
		<ChakraProvider>
			{isMobile ? <DrawerMobile /> : desk()}
		</ChakraProvider>
	)
}
export default Navbar