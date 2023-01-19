import { useState } from 'react'
import { getClientQuote } from '../../../data/quotes'
import { Stack } from '@chakra-ui/react'
import Service from '../../../components/quote/Service'
import Resume from '../../../components/quote/Resume'
import MoreData from '../../../components/quote/MoreData'

export async function getServerSideProps(context) {
    try {
        const loggedIn = context.req.headers.cookie.split(';').find(c => c.trim().startsWith('loggedIn=')).split('=')[1]
        if (loggedIn === 'true') {
            const res = await getClientQuote(context.query.cotizacion, context.req.headers.cookie)
            return {
                props: {
                    quoteData: res.data
                }
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

const VisualizarCotizacion = ({ quoteData }) => {
    const [dotsImage] = useState([
        '/dots.png',
        '/dots2.png',
        '/dots3.png',
        '/dots4.png',
        '/dots5.png',
        '/dots6.png',
    ])
    const [dots] = useState(() => {
        const dots = []
        for (let i = 0; i < quoteData.quoteServices.length + 2; i++) {
            dots.push(dotsImage[i % dotsImage.length])
        }
        return dots
    })

    return (
        <>
            <Stack w={'full'} h={"150vh"} justify={"center"} align="center" backgroundImage="url('/portada.png')" bgSize={'cover'} bgPosition={'center'} />
            <Stack w={'full'} h={"150vh"} justify={"center"} align="center" backgroundImage="url('/creamos-marcas-a-fuego.jpg')" bgSize={'cover'} mt={"-1"} />
            <Stack w={'full'} h={"100vh"} justify={"center"} align="center" bgColor={"#FF5122"} bgSize={'cover'} p={'28'} >
                <Stack w={'90%'} h={"full"} justify={"center"} align="center" backgroundImage="url('/aqui-estan-los.png')" bgRepeat={'no-repeat'} bgSize={'contain'} />
            </Stack>
            {quoteData.quoteServices.map((service, index) => {
                return (
                    <Service key={index} index={index} name={service.service.name} items={service.service.item} description={service.service.description} dots={dots[index]} />
                )
            })}
            <Resume quoteData={quoteData} />
            <MoreData quoteData={quoteData} />
            <Stack w={'full'} h={"150vh"} justify={"center"} align="center" backgroundImage="url('/fondo-cotizacion-fragua.jpg')" bgSize={'cover'} bgPosition={'center'} />
        </>
    )
}

export default VisualizarCotizacion