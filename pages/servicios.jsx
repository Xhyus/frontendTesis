import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Heading, Container, Wrap, WrapItem, Grid, GridItem } from '@chakra-ui/react'
import { getServices } from '../data/services'
import ServiceCard from '../components/ServiceCard'
import SearchButton from '../components/SearchButton'

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

const Servicios = ({ data }) => {
    const [filter, setFilter] = useState({
        status: false,
        filteredServices: [],
        searchTerm: ''
    })
    const router = useRouter()

    useEffect(() => {
        setFilter({
            ...filter,
            filteredServices: data.filter(service => {
                return (
                    service.name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
                    service.description.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
                    service.price.toString().includes(filter.searchTerm) ||
                    service.type.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
                    service.item.some(item => item.description.toLowerCase().includes(filter.searchTerm.toLowerCase()))
                )
            })
        })
    }, [filter.searchTerm])

    const setSearch = (e) => {
        if (e.target?.value.length > 0) {
            setFilter({
                ...filter,
                status: true,
                searchTerm: e.target.value
            })
        } else {
            setFilter({
                status: false,
                searchTerm: '',
                filteredServices: data
            })
        }
    }

    const sendToService = (id) => router.push(`/servicios/ver/${id}`)

    return (
        <Container maxW={"container.xl"} centerContent pb={10} >
            <Heading as={"h1"} mt={10} fontSize={'6xl'}>Servicios</Heading>
            <SearchButton goToPage="/servicios/crear" setSearch={setSearch} text="Crear" searchTerm={filter.searchTerm} />
            <Grid gap={10} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} mt={10}>
                {filter.filteredServices.map(service => {
                    return (
                        <GridItem h='xs' key={service._id}>
                            <ServiceCard id={service._id} title={service.name} price={service.price} description={service.description} type={service.type} items={service.item.length} message="Detalles" func={sendToService} />
                        </GridItem>
                    )
                })}
            </Grid>
        </Container >
    )
}

export default Servicios