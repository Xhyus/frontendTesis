import { InputGroup, InputLeftElement, Input, InputRightElement, HStack, Button, filter } from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai'
import { useRouter } from 'next/router'

const SearchButton = ({ searchTerm, goToPage, setSearch, text, func }) => {
    const router = useRouter()
    if (func) {
        return (
            <HStack w={"full"} my={5} align={"center"}>
                <Button leftIcon={<AiOutlinePlus size={20} strokeWidth={150} />} w={{ base: "full", md: "22%" }} fontSize={'xl'} borderRadius={"3xl"} bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} px={10} onClick={func}>{text}</Button>
                <InputGroup w={{ base: "full", md: "40%" }} >
                    <InputLeftElement >
                        <AiOutlineSearch />
                    </InputLeftElement>
                    <Input w={"full"} borderRadius={'3xl'} focusBorderColor={"yellow.600"} value={searchTerm} type="text" placeholder="Buscar" onChange={setSearch} />
                    <InputRightElement _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setSearch({ ...filter, searchTerm: '' })} >
                        <AiOutlineClose />
                    </InputRightElement>
                </InputGroup>
            </HStack>
        )
    } else {
        return (
            <HStack w={"full"} my={5} align={"center"}>
                <Button leftIcon={<AiOutlinePlus size={20} strokeWidth={150} />} w={{ base: "full", md: "22%" }} fontSize={'2xl'} borderRadius={"3xl"} bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} px={10} onClick={() => router.push(goToPage)}>{text}</Button>
                <InputGroup w={{ base: "full", md: "40%" }} >
                    <InputLeftElement >
                        <AiOutlineSearch />
                    </InputLeftElement>
                    <Input w={"full"} borderRadius={'3xl'} focusBorderColor={"yellow.600"} value={searchTerm} type="text" placeholder="Buscar" onChange={setSearch} />
                    <InputRightElement _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setSearch({ ...filter, searchTerm: '' })} >
                        <AiOutlineClose />
                    </InputRightElement>
                </InputGroup>
            </HStack>
        )
    }
}

export default SearchButton