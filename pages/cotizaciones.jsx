import { useState, useEffect } from 'react'
import { Heading, Wrap, Container } from '@chakra-ui/react';
import { checkToken } from '../data/user';
import { useRouter } from 'next/router';
import SearchButton from '../components/SearchButton';

export async function getServerSideProps(context) {
    try {
        const res = await checkToken(context.req.headers.cookie)
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

const cotizaciones = ({ data }) => {
    const [services] = useState(data)
    const [filteredServices, setFilteredServices] = useState([])
    const [filter, setFilter] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    useEffect(() => {
        // const results = services.filter(service => {
        //     return (
        //         service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //         service.price.toString().includes(searchTerm) ||
        //         service.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //         service.item.some(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        //     )
        // })
        // setFilteredServices(results)
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



    // const cardList = (data) => {
    //     return data.map(service => {
    //         return (
    //             <WrapItem key={service._id}>
    //                 <ServiceCard id={service._id} title={service.name} price={service.price} description={service.description} type={service.type} items={service.item.length} message="Detalles" func={sendToService} />
    //             </WrapItem>
    //         )
    //     })
    // }

    return (
        <Container maxW={"container.xl"} centerContent>
            <Heading mt={10} fontSize={'6xl'}>Cotizaciones</Heading>
            <SearchButton goToPage="/cotizaciones/crear" setSearchTerm={setSearchTerm} searchTerm={searchTerm} setSearch={setSearch} text={"Crear"} />
            <Wrap spacing={10} justify={{ base: "center", md: "normal" }}>
                {/* {cardList(filter ? filteredServices : services)} */}
            </Wrap>
        </Container >
    )
}

export default cotizaciones