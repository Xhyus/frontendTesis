import { Heading, HStack, Image, Stack, Text } from "@chakra-ui/react"

const Service = ({ name, items, description, dots }) => {
    return (
        <>
            <Stack w={'full'} minH={"100vh"} justify={"center"} align="start" bgColor={"#FFFFFF"} bgSize={'cover'} px={'40'} pb={"28"} >
                <HStack w={"full"} justify={'space-between'} align={"start"}>
                    <Stack w={"20%"}>
                        <Stack bgColor={"black"} w={"full"} py={3} mb={4} />
                        <Image src={dots} w={'full'} />
                    </Stack>
                    <Stack w={"80%"} px={"28"}>
                        <Stack bgColor={"#FF5122"} w={"full"} py={3} mb={4} />
                        <Heading as="h1" size="4xl" fontWeight={"extrabold"} color="black">{name}</Heading>
                        <Stack bgColor={"#000000"} w={"full"} h={"0.5"} my={2} />
                        {items.map((item, index) => {
                            return (
                                <>
                                    <Text fontSize={'2xl'} color="black" > {index + 1}.- {item.description}</Text>
                                    <Stack bgColor={"#000000"} w={"full"} h={"0.5"} mb={2} />
                                </>
                            )
                        })}
                        <Text fontSize={'2xl'} color="black">{description}</Text>
                    </Stack>
                </HStack>
            </Stack >
            <Stack w={'full'} py={6} justify={"center"} align="center" bgColor={"#000000"} bgSize={'cover'} >
                <HStack justify={"space-between"} px={'16'}>
                    <Text>Esta cotización tiene una vigencia de 30 días desde su entrega.</Text>
                    <Image src={'/logo-fragua-blanco.png'} w={'7%'} />
                </HStack>
            </Stack>
        </>
    )
}

export default Service