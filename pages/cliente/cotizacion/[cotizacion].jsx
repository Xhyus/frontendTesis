import { useState } from 'react'
import { getQuote } from '../../../data/quotes'
import { Container, Divider, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react'
import Service from '../../../components/quote/Service'

export async function getServerSideProps(context) {
    try {
        const res = await getQuote(context.query.cotizacion, context.req.headers.cookie)
        return {
            props: {
                quote: res.data
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

const visualizarCotizacion = ({ quote }) => {
    const [quoteData] = useState(quote)
    const [dotsImage] = useState([
        '/dots.png',
        '/dots2.png',
        '/dots3.png',
        '/dots4.png',
        '/dots5.png',
        '/dots6.png',
        '/dots7.png',
        '/dots8.png',
        '/dots9.png',
        '/dots10.png'
    ])
    const [dots] = useState(() => {
        const dots = []
        for (let i = 0; i < quoteData.quoteServices.length; i++) {
            dots.push(dotsImage[i % dotsImage.length])
        }
        return dots
    })

    return (
        <>
            <Stack w={'full'} h={"150vh"} justify={"center"} align="center" backgroundImage="url('/fondo-cotizacion-fragua.jpg')" bgSize={'cover'} />
            <Stack w={'full'} h={"150vh"} justify={"center"} align="center" backgroundImage="url('/creamos-marcas-a-fuego.jpg')" bgSize={'cover'} />
            <Stack w={'full'} h={"100vh"} justify={"center"} align="center" bgColor={"#FF5122"} bgSize={'cover'} p={'28'} >
                <Stack w={'full'} h={"full"} justify={"center"} align="center" backgroundImage="url('/aqui-estan-los.png')" bgRepeat={'no-repeat'} bgSize={'contain'} />
            </Stack>
            {quoteData.quoteServices.map((service, index) => {
                return (
                    <Service key={index} name={service.service.name} items={service.service.item} description={service.service.description} dots={dots[index]} />
                )
            })}
        </>
    )
}

export default visualizarCotizacion