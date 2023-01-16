import { InputGroup, InputLeftElement, Input, InputRightElement, HStack, Button } from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineSearch, AiOutlineEye } from 'react-icons/ai'

const SearchLook = ({ searchTerm, setFilter, text, setStep, step, setSearch, services }) => {
    if (step !== 3) {
        return (
            <HStack w={"full"} mb={5} align={"center"}>
                <Button leftIcon={<AiOutlineEye size={20} strokeWidth={50} />} w={{ base: "full", md: "20%" }} fontSize={'xl'} bgColor={"#FF9F0F"} color="white" _hover={{ bgColor: "#F59300" }} onClick={() => setStep(3)}>{text}</Button>
                <InputGroup w={{ base: "full", md: "40%" }} >
                    <InputLeftElement >
                        <AiOutlineSearch />
                    </InputLeftElement>
                    <Input w={"full"} borderRadius={'3xl'} focusBorderColor={"yellow.600"} value={searchTerm} type="text" placeholder="Buscar" onChange={setSearch} />
                    <InputRightElement _hover={{ cursor: 'pointer', color: 'orange' }} color={"white"} onClick={() => setFilter({ status: false, searchTerm: '', filteredServices: services })} >
                        <AiOutlineClose />
                    </InputRightElement>
                </InputGroup>
            </HStack>
        )
    } else {
        return null
    }
}

export default SearchLook