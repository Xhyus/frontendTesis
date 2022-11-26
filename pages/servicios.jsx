import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { HStack, Button, Heading, Container, Input, InputGroup, InputRightElement, Card, CardHeader, CardBody, CardFooter, Text, Stack, Tag, TagLeftIcon, TagLabel, Wrap, WrapItem, Box, Flex, InputLeftAddon, InputLeftElement } from '@chakra-ui/react'
import { getServices } from '../data/services'
import ServiceCard from '../components/ServiceCard'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'

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

    const cardList = (data) => {
        return data.map(service => {
            return (
                <WrapItem key={service._id}>
                    <ServiceCard id={service._id} title={service.name} price={service.price} description={service.description} type={service.type} items={service.item.length} />
                </WrapItem>
            )
        })
    }

    return (
        <Container maxW={"container.xl"} centerContent>
            <Heading mt={10} fontSize={'6xl'}>Servicios</Heading>
            <HStack w={"full"} my={5} align={"center"}>
                <Button w={{ base: "full", md: "20%" }} fontSize={'2xl'} borderRadius={"3xl"} color={"white"} bgColor={"#7ABC63"} onClick={() => router.push('/servicios/crear')}>Crear</Button>
                <InputGroup w={{ base: "full", md: "40%" }} >
                    <InputLeftElement children={<AiOutlineSearch />} />
                    <Input w={"full"} borderRadius={'3xl'} focusBorderColor={"yellow.600"} value={searchTerm} type="text" placeholder="Buscar" onChange={setSearch} />
                    <InputRightElement children={AiOutlineClose()} _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setSearchTerm('')} />
                </InputGroup>
            </HStack>
            <Wrap spacing={10} justify={{ base: "center", md: "normal" }}>
                {cardList(filter ? filteredServices : services)}
            </Wrap>
        </Container >
    )
}

export default servicios