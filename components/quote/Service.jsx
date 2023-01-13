import { Heading, HStack, Image, Stack, Text } from "@chakra-ui/react"
import { formatText } from "../../utils/formatInfo"

const Service = ({ name, items, description, dots, index }) => {
    return (
        <>
            <Stack w={'full'} minH={"100vh"} justify={"center"} bgColor={"#FFFFFF"} bgSize={'cover'} px={'40'} py={"28"} >
                <HStack w={"full"} justify={'space-between'} align={"start"}>
                    <Stack w={"20%"}>
                        <Stack bgColor={"black"} w={"full"} py={3} mb={4} />
                        <Image src={dots} alt={`dots-${index + 1}`} w={'full'} />
                    </Stack>
                    <Stack w={"80%"} px={"28"}>
                        <Heading as="h1" size="4xl" fontFamily="AEOIK BLACK" fontWeight={"extrabold"} borderTop={"1.5rem solid #FF5122"} borderBottom={"2px solid black"} py={5} color="black">{formatText(name)}</Heading>
                        {items.map((item, index) => {
                            return (
                                <Text key={index} fontFamily="Open Sans" fontSize={'2xl'} color="black" pb={2} borderBottom={"2px solid black"} > {index + 1}.- {formatText(item.description)}</Text>
                            )
                        })}
                        <Text fontSize={'2xl'} fontFamily="Open Sans" color="black">{formatText(description)}</Text>
                    </Stack>
                </HStack>
            </Stack >
            <Stack w={'full'} py={6} justify={"center"} align="center" bgColor={"#000000"} bgSize={'cover'} >
                <HStack justify={"space-between"} px={'16'}>
                    <Text fontFamily="Open Sans" >Esta cotización tiene una vigencia de 30 días desde su entrega.</Text>
                    <Image src={'/logo-fragua-blanco.png'} alt="logo-1" w={'7%'} />
                </HStack>
            </Stack>
        </>
    )
}

export default Service