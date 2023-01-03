import { Box, Flex, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react"

const Resume = ({ quoteData }) => {

    const Item = ({ children }) => (
        <Flex w={"100%"} borderBottom="2px solid black" pb={4} pt={4} justify={"space-between"}>
            <Text color={"black"}>
                {children}
            </Text>
            <Text color={"black"}>
                12 UF
            </Text>

        </Flex>
    );
    return (
        <>
            <Box bgColor="#fff" w="full" h="100vh" px="40" py={"20"}>
                <Flex h="100%" gap={20}>
                    <Flex flexDir="column" justifyContent="space-between" w={"15%"}>
                        <Box borderTop="solid 15px black">
                            <Heading as="h1" size="2xl" fontWeight={"extrabold"} color="black">Resumen</Heading>
                        </Box>
                        <Image src="/squaredots.png" alt="dots" w="100%" />
                    </Flex>
                    <Flex borderTop="solid 15px #FF5122" w="70%" flexDir="column" justifyContent="space-between">
                        <Box mt="5">
                            <Item>Naming</Item>
                            <Item>Plan inicial</Item>
                            <Item>Plan avanzado</Item>
                            <Item>Plan Senior</Item>
                            <Item>Diseño web</Item>
                            <Item>E-Commerce</Item>
                        </Box>
                        <Flex mt="5" justify={"space-between"} align="center" w={"full"} px={10} py={1.5} bgColor={"#FF5122"}>
                            <Heading as="h1" size="2xl" fontWeight={"bold"} color="black">Total</Heading>
                            <Text color={"black"} fontWeight={"bold"}>12 UF</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Stack w={'full'} py={6} justify={"center"} align="center" bgColor={"#000000"} bgSize={'cover'} >
                <HStack justify={"space-between"} px={'16'}>
                    <Text>Esta cotización tiene una vigencia de 30 días desde su entrega.</Text>
                    <Image alt="logo-1" src={'/logo-fragua-blanco.png'} w={'7%'} />
                </HStack>
            </Stack>
        </>
    )
}

export default Resume