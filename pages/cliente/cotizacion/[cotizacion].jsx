import { useEffect, useState } from 'react'
import { getClientQuote } from '../../../data/quotes'
import { Stack, Center, Spinner } from '@chakra-ui/react'
import Service from '../../../components/quote/Service'
import Resume from '../../../components/quote/Resume'
import MoreData from '../../../components/quote/MoreData'
import { useRouter } from 'next/router'

const VisualizarCotizacion = ({ cotizacion }) => {
    const [loading, setLoading] = useState(true)
    const [quoteData, setQuoteData] = useState({})
    const router = useRouter()
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getClientQuote(cotizacion)
                setQuoteData(res.data)
                setLoading(false)
            } catch (error) {
                router.push('/servicios')
            }
        }
        getData()
    }, [])

    useEffect(() => {
        setDots(() => {
            const dots = []
            for (let i = 0; i < quoteData.quoteServices?.length + 2; i++) {
                dots.push(dotsImage[i % dotsImage.length])
            }
            return dots
        })
    }, [quoteData])
    const [dotsImage] = useState([
        '/dots.png',
        '/dots2.png',
        '/dots3.png',
        '/dots4.png',
        '/dots5.png',
        '/dots6.png',
    ])
    const [dots, setDots] = useState([])

    if (loading) {
        return (
            <Center h={'95vh'}>
                <Spinner size="xl" />
            </Center>
        )
    }

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

VisualizarCotizacion.getInitialProps = async (ctx) => {
    return { cotizacion: ctx.query.cotizacion }
}

export default VisualizarCotizacion