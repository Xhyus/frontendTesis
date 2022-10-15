import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'

function MyApp({ Component, pageProps }) {
	axios.defaults.withCredentials = true
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp