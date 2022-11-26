import React from 'react'
import { InputGroup, InputLeftElement, Input, InputRightElement, HStack, Button } from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { useRouter } from 'next/router'

const SearchButton = ({ searchTerm, goToPage, setSearchTerm, setSearch }) => {
    const router = useRouter()
    return (
        <HStack w={"full"} my={5} align={"center"}>
            <Button w={{ base: "full", md: "20%" }} fontSize={'2xl'} borderRadius={"3xl"} color={"white"} bgColor={"#7ABC63"} onClick={() => router.push(goToPage)}>Crear</Button>
            <InputGroup w={{ base: "full", md: "40%" }} >
                <InputLeftElement children={<AiOutlineSearch />} />
                <Input w={"full"} borderRadius={'3xl'} focusBorderColor={"yellow.600"} value={searchTerm} type="text" placeholder="Buscar" onChange={setSearch} />
                <InputRightElement children={AiOutlineClose()} _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setSearchTerm('')} />
            </InputGroup>
        </HStack>
    )
}

export default SearchButton