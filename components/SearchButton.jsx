import React from 'react'
import { InputGroup, InputLeftElement, Input, InputRightElement, HStack, Button } from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai'
import { BsPlusLg } from 'react-icons/bs'
import { useRouter } from 'next/router'

const SearchButton = ({ searchTerm, goToPage, setSearchTerm, setSearch, text }) => {
    const router = useRouter()
    return (
        <HStack w={"full"} my={5} align={"center"}>
            <Button leftIcon={<AiOutlinePlus size={20} strokeWidth={150} />} w={{ base: "full", md: "20%" }} fontSize={'2xl'} borderRadius={"3xl"} color={"white"} bgColor={"#7ABC63"} onClick={() => router.push(goToPage)}>{text}</Button>
            <InputGroup w={{ base: "full", md: "40%" }} >
                <InputLeftElement children={<AiOutlineSearch />} />
                <Input w={"full"} borderRadius={'3xl'} focusBorderColor={"yellow.600"} value={searchTerm} type="text" placeholder="Buscar" onChange={setSearch} />
                <InputRightElement children={AiOutlineClose()} _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setSearchTerm('')} />
            </InputGroup>
        </HStack>
    )
}

export default SearchButton