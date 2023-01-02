import { useState } from 'react'
import { getQuote } from '../../../data/quotes'
import { Container, Divider, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react'
import Service from '../../../components/quote/Service'
import { formatFormalization } from '../../../utils/formatInfo'

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
    console.log(quoteData)
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
            <Stack w={'full'} minH={"100vh"} justify={"center"} align="start" bgColor={"#FFFFFF"} bgSize={'cover'} px={'40'} pb={"28"} >
                <HStack w={"full"} justify={'space-between'} align={"start"}>
                    <Stack w={"20%"} >
                        <Stack pb={'28'} >
                            <Stack bgColor={"black"} w={"full"} py={3} mb={4} />
                            <Heading as="h1" size="2xl" fontWeight={"extrabold"} color="black">Resumen</Heading>
                        </Stack>
                        <Stack>
                            <Image align={'self-end'} src={'/squaredots.png'} w={'full'} />
                        </Stack>
                    </Stack>
                    <Stack w={"80%"} px={"28"}>
                        <Stack bgColor={"#FF5122"} w={"full"} py={3} mb={'6'} />
                        {quoteData.quoteServices.map((service, index) => {
                            return (
                                <>
                                    <HStack justify={'space-between'} key={index}>
                                        <Text fontSize={'2xl'} color="black">{service.service.name}</Text>
                                        <Text fontSize={'2xl'} color="black">{service.price} UF</Text>
                                    </HStack>
                                    <Stack bgColor={"#000000"} w={"full"} h={"0.5"} my={2} />
                                </>
                            )
                        })}
                        <Stack bgColor={"#FF5122"} w={"full"} mb={'6'}>
                            <HStack justify={'space-between'} px={10}>
                                <Text fontSize={'4xl'} fontWeight={'extrabold'} color="black">Total</Text>
                                <Text fontSize={'2xl'} fontWeight={'extrabold'} color="black">{quoteData.price} UF</Text>
                            </HStack>
                        </Stack>
                    </Stack>
                </HStack>
            </Stack>
            <Stack w={'full'} py={6} justify={"center"} align="center" bgColor={"#000000"} bgSize={'cover'} >
                <HStack justify={"space-between"} px={'16'}>
                    <Text>Esta cotización tiene una vigencia de 30 días desde su entrega.</Text>
                    <Image src={'/logo-fragua-blanco.png'} w={'7%'} />
                </HStack>
            </Stack>
            <Stack w={'full'} minH={"100vh"} justify={"center"} align="start" bgColor={"#FFFFFF"} bgSize={'cover'} px={'40'} pb={"28"} pt={10}>
                <HStack w={"full"} justify={'space-between'} align={"start"}>
                    <Stack w={"20%"} >
                        <Stack pb={'28'} >
                            <Stack bgColor={"black"} w={"full"} py={3} mb={4} />
                            <Heading as="h1" size="2xl" fontWeight={"extrabold"} color="black">Otros Datos</Heading>
                        </Stack>
                        <Stack>
                            <Image align={'self-end'} src={'/squaredots2.png'} w={'full'} />
                        </Stack>
                    </Stack>
                    <Stack w={"80%"} px={"28"}>
                        <Stack bgColor={"#FF5122"} w={"full"} py={3} mb={'6'} />
                        <Stack>
                            <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Plazo Entrega:</Text>
                            <Text fontSize={'2xl'} color="black">Cambiar por plazo de entrega </Text>
                        </Stack>
                        <Stack bgColor={"#000000"} w={"full"} h={"0.5"} my={3} />
                        <Stack>
                            <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Formalizacion:</Text>
                            <Text fontSize={'2xl'} color="black">{formatFormalization(quoteData.formalization)} </Text>
                        </Stack>
                        <Stack bgColor={"#000000"} w={"full"} h={"0.5"} my={3} />
                        <Stack>
                            <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Metodo de pago:</Text>
                            <Text fontSize={'2xl'} color="black">{quoteData.paymentMethod} </Text>
                        </Stack>
                        <Stack bgColor={"#000000"} w={"full"} h={"0.5"} my={3} />
                        <Stack>
                            <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Formas de pago:</Text>
                            <Text fontSize={'2xl'} color="black">{quoteData.payment} </Text>
                        </Stack>
                        <Stack bgColor={"#000000"} w={"full"} h={"0.5"} my={3} />
                        <Stack>
                            <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Documentos:</Text>
                            <Text fontSize={'2xl'} color="black">{quoteData.documents} </Text>
                        </Stack>
                        <Stack bgColor={"#000000"} w={"full"} h={"0.5"} my={3} />
                        <Stack>
                            <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Cuenta Bancaria:</Text>
                            <Text fontSize={'2xl'} color="black">PryxLabs SpA</Text>
                            <Text fontSize={'2xl'} color="black">Rut 76.994.376-5</Text>
                            <Text fontSize={'2xl'} color="black">Cuenta Corriente Santander</Text>
                            <Text fontSize={'2xl'} color="black">0-000-8767731-1</Text>
                            <Text fontSize={'2xl'} color="black">Cnovoa@pryx.cl</Text>
                        </Stack>
                        <Stack bgColor={"#000000"} w={"full"} h={"0.5"} my={3} />
                    </Stack>
                </HStack>
            </Stack>
            <Stack w={'full'} py={6} justify={"center"} align="center" bgColor={"#000000"} bgSize={'cover'} >
                <HStack justify={"space-between"} px={'16'}>
                    <Text>Esta cotización tiene una vigencia de 30 días desde su entrega.</Text>
                    <Image src={'/logo-fragua-blanco.png'} w={'7%'} />
                </HStack>
            </Stack>
            <Stack w={'full'} h={"150vh"} justify={"center"} align="center" backgroundImage="url('/fondo-cotizacion-fragua.jpg')" bgSize={'cover'} />
        </>
    )
}

export default visualizarCotizacion