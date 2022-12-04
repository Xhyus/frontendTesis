import { ChakraProvider, Stack } from '@chakra-ui/react'
import axios from 'axios'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
	const router = useRouter()
	axios.defaults.withCredentials = true
	const useNavbar = () => {
		if (router.pathname == '/' || router.pathname == '' || router.pathname == '/404' || router.pathname == '/empresa/crear/[empresa]') {
			return <Component {...pageProps} />
		} else {
			return <>
				<Navbar />
				<Component {...pageProps} />
			</>
		}
	}

	return (
		<ChakraProvider>
			<Head>
				<title>Estudio Fragua</title>
				<link rel="icon" href="/favicon.ico" />
				<style>{`
					#__next {
						width: 100% !important;
						height: 100% !important;
					}
				`}</style>
			</Head>
			{useNavbar()}
		</ChakraProvider>
	)
}

export default MyApp