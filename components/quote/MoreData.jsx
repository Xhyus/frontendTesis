import { Box, Flex, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react"
import { formatFormalization } from "../../utils/formatInfo"

const MoreData = ({ quoteData }) => {
    return (
        <>
            <Box bgColor="#fff" w="full" minH="100vh" px="40" py={"20"}>
                <Flex h="100%" gap={20}>
                    <Flex flexDir="column" justifyContent="space-between" w={"15%"}>
                        <Box borderTop="solid 15px black">
                            <Heading as="h1" size="2xl" fontWeight={"extrabold"} color="black">Otros Datos</Heading>
                        </Box>
                        <Image src="/squaredots2.png" alt="dots" w="100%" />
                    </Flex>
                    <Box borderTop="solid 15px #FF5122" w="70%">
                        <Box mt="5">
                            <Stack w={"100%"}>
                                <Stack borderBottom={"2px solid black"}>
                                    <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Plazo Entrega:</Text>
                                    <Text fontSize={'2xl'} color="black">Cambiar por plazo de entrega </Text>
                                </Stack>
                                <Stack borderBottom={"2px solid black"}>
                                    <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Formalizacion:</Text>
                                    <Text fontSize={'2xl'} color="black">{formatFormalization(quoteData.formalization)} </Text>
                                </Stack>
                                <Stack borderBottom={"2px solid black"}>
                                    <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Metodo de pago:</Text>
                                    <Text fontSize={'2xl'} color="black">{quoteData.paymentMethod} </Text>
                                </Stack>
                                <Stack borderBottom={"2px solid black"}>
                                    <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Formas de pago:</Text>
                                    <Text fontSize={'2xl'} color="black">{quoteData.payment} </Text>
                                </Stack>
                                <Stack borderBottom={"2px solid black"}>
                                    <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Documentos:</Text>
                                    <Text fontSize={'2xl'} color="black">{quoteData.documents} </Text>
                                </Stack>
                                <Stack borderBottom={"2px solid black"}>
                                    <Text fontSize={'2xl'} color="black" fontWeight={'semibold'}>Cuenta Bancaria:</Text>
                                    <Text fontSize={'2xl'} color="black">PryxLabs SpA</Text>
                                    <Text fontSize={'2xl'} color="black">Rut 76.994.376-5</Text>
                                    <Text fontSize={'2xl'} color="black">Cuenta Corriente Santander</Text>
                                    <Text fontSize={'2xl'} color="black">0-000-8767731-1</Text>
                                    <Text fontSize={'2xl'} color="black">Cnovoa@pryx.cl</Text>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </Flex>
            </Box >
            <Stack w={'full'} py={6} justify={"center"} align="center" bgColor={"#000000"} bgSize={'cover'} >
                <HStack justify={"space-between"} px={'16'}>
                    <Text>Esta cotización tiene una vigencia de 30 días desde su entrega.</Text>
                    <Image alt="logo-1" src={'/logo-fragua-blanco.png'} w={'7%'} />
                </HStack>
            </Stack>
        </>
    )
}

export default MoreData