import { Heading, HStack, Image, Stack, Text } from "@chakra-ui/react"

const Resume = ({ quoteData }) => {
    return (
        <>
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
        </>
    )
}

export default Resume