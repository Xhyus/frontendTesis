import React from 'react'
import { InputGroup, InputLeftElement, Input, InputRightElement, HStack, Button } from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineSearch, AiOutlineEye } from 'react-icons/ai'
import { useRouter } from 'next/router'

const SearchLook = ({ searchTerm, setSearchTerm, setSearch, text, setStep, step }) => {
    if (step !== 3) {
        return (
            <HStack w={"full"} my={5} align={"center"}>
                <Button leftIcon={<AiOutlineEye size={20} strokeWidth={50} />} w={{ base: "full", md: "20%" }} fontSize={'2xl'} color={"white"} bgColor={"#1A535C"} onClick={() => setStep(3)}>{text}</Button>
                <InputGroup w={{ base: "full", md: "40%" }} >
                    <InputLeftElement children={<AiOutlineSearch />} />
                    <Input w={"full"} borderRadius={'3xl'} focusBorderColor={"yellow.600"} value={searchTerm} type="text" placeholder="Buscar" onChange={setSearch} />
                    <InputRightElement children={AiOutlineClose()} _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setSearchTerm('')} />
                </InputGroup>
            </HStack>
        )
    } else {
        return null
    }
}

export default SearchLook