import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { HStack, Button, Heading, Container, Input, InputGroup, InputRightElement, Card, CardHeader, CardBody, CardFooter, Text, Stack, Tag, TagLeftIcon, TagLabel, Wrap, WrapItem, Box, Flex } from '@chakra-ui/react'
import { getServices } from '../data/services'
import ServicesTable from '../components/ServicesTable'
import { AiOutlineClose, AiFillMoneyCollect } from 'react-icons/ai'
import Pagination from '../components/Pagination'
// import calculatePagination from '../utils/calculatePagination'

export async function getServerSideProps(context) {
    try {
        const res = await getServices(context.req.headers.cookie)
        return {
            props: {
                data: res.data
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
const servicios = ({ data }) => {
    const [services] = useState(data)
    const [filteredServices, setFilteredServices] = useState([])
    const [filter, setFilter] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    useEffect(() => {
        const results = services.filter(service => {
            return (
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.price.toString().includes(searchTerm) ||
                service.item.some(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        })
        setFilteredServices(results)
    }, [searchTerm])

    const setSearch = (e) => {
        if (e.target.value.length > 0) {
            setSearchTerm(e.target.value)
            setFilter(true)
        } else {
            setSearchTerm('')
            setFilter(false)
        }
    }

    return (
        <Container maxW={"container.xl"} centerContent>
            <Heading mt={10}>Servicios</Heading>
            <HStack w={"full"} my={5}>
                <Button w={"full"} colorScheme="blue" onClick={() => router.push('/servicios/crear')}>Crear</Button>
                <InputGroup w={"full"} >
                    <Input w={"full"} focusBorderColor={"yellow.600"} value={searchTerm} type="text" placeholder="Buscar" onChange={setSearch} />
                    <InputRightElement children={AiOutlineClose()} _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setSearchTerm('')} />
                </InputGroup>
            </HStack>
            <Wrap spacing={10} justify={"center"}>
                <WrapItem>
                    <Card w={"sm"} borderRadius={20}>
                        <Flex flexDirection={"column"} p={'10'}>
                            <Heading as={"h2"} fontWeight={'semibold'}>Plan Inicia</Heading>
                            <Box mb={3} mt={2}>
                                <Tag size="lg" borderRadius={'3xl'} py={2} px={3} w={"fit-content"} bgColor={"#FF9F0F"} color={"white"}>
                                    <TagLabel fontWeight={'bold'}>$ 12.345.678</TagLabel>
                                </Tag>
                            </Box>
                            <Text >Lorem ipsum dolor sit amet consectetur. In faucibus nisl dictum sed tortor elit pretium hac. Donec proin vitae et nibh. Vitae massa in eu nec ullamcorper magna.</Text>
                            <HStack justify={"space-between"} pt={5}>
                                <Text>Diseño | 6 items</Text>
                                <Button borderRadius={10} colorScheme="blue" color={"white"}>Detalles</Button>
                            </HStack>
                        </Flex>
                    </Card>
                </WrapItem>

            </Wrap>

        </Container >
    )
}

export default servicios