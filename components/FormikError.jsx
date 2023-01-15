import { Text, Stack } from '@chakra-ui/react'

const FormikError = ({ error }) => {
    return (
        <Stack w={"full"}>
            <Text color={"red"}>{error}</Text>
        </Stack>
    )
}

export default FormikError